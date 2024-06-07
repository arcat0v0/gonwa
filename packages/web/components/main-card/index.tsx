"use client";

import { Suspense, useEffect, useState } from "react";
import { Card } from "../ui/card";
import { eventEmitter } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Loading } from "../ui/loading";
import { ConnectCard } from "../connect-card";

export function MainCard() {
	const [step, setStep] = useState<"join" | "create" | "start">("start");
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => {
		eventEmitter.on("join", () => setStep("join"));
		eventEmitter.on("create", () => setStep("create"));
		eventEmitter.on("exit", () => setStep("start"));
		setIsFirstRender(false);
		return () => {
			eventEmitter.off("join", () => setStep("join"));
			eventEmitter.off("create", () => setStep("create"));
			eventEmitter.off("exit", () => setStep("start"));
		};
	}, []);

	return (
		<Card className="md:w-[800px] md:h-[400px] flex items-center justify-center overflow-hidden">
			<AnimatePresence>
				<Suspense fallback={<Loading />}>
					<SwitchStepComponent step={step} isFirstRender={isFirstRender} />
				</Suspense>
			</AnimatePresence>
		</Card>
	);
}

function SwitchAnimate({
	isFirstRender,
	children,
}: { isFirstRender: boolean; children: React.ReactNode }) {
	const cardVariants = {
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 400 },
		enter: { opacity: 0, y: -400 },
	};

	return (
		<AnimatePresence>
			<motion.div
				variants={cardVariants}
				initial={isFirstRender ? "visible" : "enter"}
				animate="visible"
				exit="exit"
				transition={{ duration: 0.5 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

function SwitchStepComponent({
	step,
	isFirstRender,
}: { step: "join" | "create" | "start"; isFirstRender: boolean }) {
	return (
		<SwitchAnimate isFirstRender={isFirstRender}>
			{step === "start" ? <ConnectCard /> : null}
		</SwitchAnimate>
	);
}
