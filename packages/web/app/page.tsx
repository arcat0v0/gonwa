import { ConnectCard } from "@/components/connect-card";
import { useTranslations } from "next-intl";

export default function Home() {
	const tConnectCard = useTranslations("ConnectCard");

	return (
		<main className="w-screen h-screen flex items-center justify-center">
			<div className="md:w-[800px] md:h-[500px]">
				<ConnectCard
					title={tConnectCard("title")}
					joinRoomLabel={tConnectCard("joinRoomLabel")}
					createRoomLabel={tConnectCard("createRoomLabel")}
					joinRoomInputLabel={tConnectCard("joinRoomInputLabel")}
					createRoomInputLabel={tConnectCard("createRoomInputLabel")}
					orLabel={tConnectCard("orLabel")}
					startLabel={tConnectCard("startLabel")}
				/>
			</div>
		</main>
	);
}
