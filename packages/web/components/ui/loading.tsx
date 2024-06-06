import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function Loading({ className }: { className?: string }) {
	return (
		<main className={cn("flex justify-center items-center h-8 w-8", className)}>
			<Loader2 className="h-full w-full animate-spin" />
		</main>
	);
}
