"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ConnectCardProps {
	title: string;
	joinRoomLabel: string;
	createRoomLabel: string;
	joinRoomInputLabel: string;
	createRoomInputLabel: string;
	orLabel: string;
	startLabel: string;
}

export function ConnectCard({
	title,
	joinRoomLabel,
	createRoomLabel,
	joinRoomInputLabel,
	createRoomInputLabel,
	orLabel,
	startLabel,
}: ConnectCardProps) {
	const [roomId, setRoomId] = useState("");
	const [roomName, setRoomName] = useState("");

	function handleSubmit() {
		if (roomId) {
			// join room
		} else if (roomName) {
			// create room
		}
	}

	return (
		<>
			<CardHeader className="text-center font-semibold text-[30px]">
				{title}
			</CardHeader>
			<CardContent>
				<form
					className="flex flex-col items-center gap-2"
					action={handleSubmit}
				>
					<div className="flex items-center">
						<Label className="w-[100px] mr-1">{joinRoomLabel}</Label>
						<Input
							placeholder={joinRoomInputLabel}
							onChange={(e) => setRoomId(e.currentTarget.value)}
							value={roomId}
							disabled={roomName !== ""}
						/>
					</div>
					<p className="w-full text-center">{orLabel}</p>
					<div className="flex items-center">
						<Label className="w-[100px] mr-1">{createRoomLabel}</Label>
						<Input
							placeholder={createRoomInputLabel}
							onChange={(e) => setRoomName(e.currentTarget.value)}
							value={roomName}
							disabled={roomId !== ""}
						/>
					</div>
					<Button type="submit" className="mt-2">
						{startLabel}
					</Button>
				</form>
			</CardContent>
		</>
	);
}
