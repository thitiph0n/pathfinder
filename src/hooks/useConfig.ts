import { useEffect, useState } from "react";
import type { Config } from "../types";

function validateConfig(data: unknown): void {
	if (!data || typeof data !== "object") {
		throw new Error("config.json must be a JSON object");
	}
	const obj = data as Record<string, unknown>;
	if (typeof obj.title !== "string" || !obj.title) {
		throw new Error('Missing required field: "title" (string)');
	}
	if (!Array.isArray(obj.groups)) {
		throw new Error('Missing required field: "groups" (array)');
	}
	for (let i = 0; i < obj.groups.length; i++) {
		const group = obj.groups[i] as Record<string, unknown>;
		if (typeof group.name !== "string" || !group.name) {
			throw new Error(`groups[${i}] missing required field: "name" (string)`);
		}
		if (!Array.isArray(group.apps)) {
			throw new Error(`groups[${i}] missing required field: "apps" (array)`);
		}
	}
}

interface UseConfigReturn {
	config: Config | null;
	loading: boolean;
	error: Error | null;
}

export function useConfig(): UseConfigReturn {
	const [config, setConfig] = useState<Config | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchConfig = async () => {
			try {
				const response = await fetch("/config.json");
				if (!response.ok) {
					throw new Error(
						response.status === 404
							? "config.json not found — make sure the file is mounted at /usr/share/nginx/html/config.json"
							: `Failed to fetch config.json: ${response.status} ${response.statusText}`,
					);
				}
				const contentType = response.headers.get("content-type") ?? "";
				if (!contentType.includes("json")) {
					throw new Error(
						"config.json returned non-JSON content — the mounted file may be invalid or the wrong file",
					);
				}
				const data = await response.json();
				validateConfig(data);
				setConfig(data as Config);
			} catch (err) {
				setError(err instanceof Error ? err : new Error("Unknown error"));
			} finally {
				setLoading(false);
			}
		};

		fetchConfig();
	}, []);

	return { config, loading, error };
}
