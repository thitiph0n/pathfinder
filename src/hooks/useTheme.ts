import { useEffect, useState } from "react";

type Theme = "light" | "dark";
export type ThemeMode = "light" | "dark" | "system";

interface UseThemeReturn {
	theme: Theme;
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
}

function getSystemTheme(): Theme {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export function useTheme(): UseThemeReturn {
	const [mode, setModeState] = useState<ThemeMode>(() => {
		const stored = localStorage.getItem("theme");
		if (stored === "light" || stored === "dark" || stored === "system")
			return stored;
		return "system";
	});

	const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = (e: MediaQueryListEvent) =>
			setSystemTheme(e.matches ? "dark" : "light");
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	const theme = mode === "system" ? systemTheme : mode;

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", mode);
	}, [theme, mode]);

	function setMode(next: ThemeMode) {
		setModeState(next);
	}

	return { theme, mode, setMode };
}
