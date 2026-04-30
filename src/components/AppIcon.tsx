import type { ReactNode } from "react";
import { getIconResolver } from "../iconRegistry.ts";

interface AppIconProps {
	icon: string;
}

export function AppIcon({ icon }: AppIconProps): ReactNode {
	const IconResolver = getIconResolver();
	if (!IconResolver) {
		return <div className="w-6 h-6" />;
	}
	return <IconResolver icon={icon} priority="simple-icons" />;
}
