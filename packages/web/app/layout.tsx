import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "GonWa",
	description: "Online voice chat",
};

const xiaolaiMono = localFont({
	src: "../public/fonts/kose/XiaolaiMonoSC-Regular.ttf",
	display: "swap",
});

const xiaolai = localFont({
	src: "../public/fonts/kose/XiaolaiSC-Regular.ttf",
	display: "swap",
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang="en">
			<NextIntlClientProvider messages={messages}>
				<body className={cn("bg-gray-200", xiaolai.className)}>
					<main>{children}</main>
					<Toaster />
				</body>
			</NextIntlClientProvider>
		</html>
	);
}
