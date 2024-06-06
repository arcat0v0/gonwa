"use client";

import { Suspense, useEffect, useState } from "react";
import { ConnectCard } from "../connect-card";
import { Card } from "../ui/card";
import { useTranslations } from "next-intl";
import { eventEmitter } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Loading } from "../ui/loading";

export function MainCard() {
	const tConnectCard = useTranslations("ConnectCard");
	const [step, setStep] = useState<"join" | "create" | "start">("start");
	const [isFirstRender, setIsFirstRender] = useState(true);

	const cardVariants = {
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 400 },
		enter: { opacity: 0, y: -400 },
	};

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

	function ConnectCardWithText() {
		return (
			<ConnectCard
				title={tConnectCard("title")}
				joinRoomLabel={tConnectCard("joinRoomLabel")}
				createRoomLabel={tConnectCard("createRoomLabel")}
				joinRoomInputLabel={tConnectCard("joinRoomInputLabel")}
				createRoomInputLabel={tConnectCard("createRoomInputLabel")}
				orLabel={tConnectCard("orLabel")}
				startLabel={tConnectCard("startLabel")}
			/>
		);
	}

	return (
		<Card className="md:w-[800px] md:h-[400px] flex items-center justify-center overflow-hidden">
			<AnimatePresence>
				<motion.div
					variants={cardVariants}
					initial={isFirstRender ? "visible" : "enter"}
					animate="visible"
					exit="exit"
					transition={{ duration: 0.5 }}
				>
					<Suspense fallback={<Loading />}>
						{step === "start" ? <ConnectCardWithText /> : null}
					</Suspense>
				</motion.div>
			</AnimatePresence>
		</Card>
	);
}
