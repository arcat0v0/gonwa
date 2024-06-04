"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
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

	return (
		<Card>
			<CardHeader className="text-center font-semibold text-[30px]">
				{title}
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center gap-2">
					<div className="flex items-center">
						<Label className="w-20 mr-1">{joinRoomLabel}</Label>
						<Input
							placeholder={joinRoomInputLabel}
							onChange={(e) => setRoomId(e.currentTarget.value)}
							value={roomId}
							disabled={roomName !== ""}
						/>
					</div>
					<p className="w-full text-center">{orLabel}</p>
					<div className="flex items-center">
						<Label className="w-20 mr-1">{createRoomLabel}</Label>
						<Input
							placeholder={createRoomInputLabel}
							onChange={(e) => setRoomName(e.currentTarget.value)}
							value={roomName}
							disabled={roomId !== ""}
						/>
					</div>
					<Button>{startLabel}</Button>
				</div>
			</CardContent>
		</Card>
	);
}
