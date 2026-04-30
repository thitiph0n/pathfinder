import type { ReactNode } from "react";
import { getIconResolver } from "../iconRegistry.ts";

interface GroupIconProps {
	icon: string;
}

export function GroupIcon({ icon }: GroupIconProps): ReactNode {
	const IconResolver = getIconResolver();
	if (!IconResolver) {
		return <div className="w-6 h-6" />;
	}
	return <IconResolver icon={icon} priority="lucide" />;
}
