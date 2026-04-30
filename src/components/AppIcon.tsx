import type { ReactNode } from "react";
import { lazy, Suspense } from "react";

const IconResolver = lazy(() => import("./IconResolver"));

interface AppIconProps {
	icon: string;
}

export function AppIcon({ icon }: AppIconProps): ReactNode {
	return (
		<Suspense fallback={<span className="text-2xl">?</span>}>
			<IconResolver icon={icon} priority="simple-icons" />
		</Suspense>
	);
}
