import type { ComponentType } from "react";

interface IconResolverProps {
	icon: string;
	size?: number;
	priority?: "simple-icons" | "lucide";
}

let IconResolver: ComponentType<IconResolverProps> | null = null;

export function setIconResolver(component: ComponentType<IconResolverProps>) {
	IconResolver = component;
}

export function getIconResolver(): ComponentType<IconResolverProps> | null {
	return IconResolver;
}
