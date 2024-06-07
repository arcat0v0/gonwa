"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { eventEmitter } from "@/lib/utils";
import { client } from "@/lib/api";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";

export function ConnectCard() {
	const t = useTranslations("ConnectCard");
	const tToast = useTranslations("Toast");
	const { toast } = useToast();

	const [roomId, setRoomId] = useState("");
	const [roomName, setRoomName] = useState("");

	async function handleSubmit() {
		if (roomId) {
			client
				.joinRoom({
					body: { roomId, identity: "test" },
				})
				.then((info) => {
					console.log(info);
				})
				.catch((err) => {
					toast({
						variant: "destructive",
						title: tToast("404NotFoundRoomTitle"),
						description: tToast("404NotFoundRoomDescription"),
					});
				});
		} else if (roomName) {
			client
				.createRoom({
					body: {
						roomName: "test",
						roomDescription: "test",
					},
				})
				.then((res) => {
					if (res.status === 200 && res.body.status === 600) {
						client.registerUser({ body: {} }).then((res) => {
							console.log(res);
						});
					} else {
						console.log(res);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	useEffect(() => {
		setTimeout(() => {
			eventEmitter.emit("start");
		}, 2000);
	}, []);

	return (
		<>
			<CardHeader className="text-center font-semibold text-[30px]">
				{t("title")}
			</CardHeader>
			<CardContent>
				<form
					className="flex flex-col items-center gap-2"
					action={handleSubmit}
				>
					<div className="flex items-center">
						<Label className="w-[100px] mr-1">{t("joinRoomLabel")}</Label>
						<Input
							placeholder={t("joinRoomInputLabel")}
							onChange={(e) => setRoomId(e.currentTarget.value)}
							value={roomId}
							disabled={roomName !== ""}
						/>
					</div>
					<p className="w-full text-center">{t("orLabel")}</p>
					<div className="flex items-center">
						<Label className="w-[100px] mr-1">{t("createRoomLabel")}</Label>
						<Input
							placeholder={t("createRoomInputLabel")}
							onChange={(e) => setRoomName(e.currentTarget.value)}
							value={roomName}
							disabled={roomId !== ""}
						/>
					</div>
					<Button type="submit" className="mt-2">
						{t("startLabel")}
					</Button>
				</form>
			</CardContent>
		</>
	);
}
