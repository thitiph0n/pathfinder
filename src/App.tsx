import { useEffect, useState } from "react";
import { GroupSection } from "./components/GroupSection";
import { Header } from "./components/Header";
import { useConfig } from "./hooks/useConfig";
import { useTheme } from "./hooks/useTheme";

function App() {
	const { config, loading, error } = useConfig();
	const [searchQuery, setSearchQuery] = useState("");
	const { theme, mode, setMode } = useTheme();

	useEffect(() => {
		if (config?.title) {
			document.title = `${config.title} | Pathfinder`;
		}
	}, [config?.title]);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<span className="loading loading-spinner loading-lg" />
			</div>
		);
	}

	if (error || !config) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-base-200">
				<div className="max-w-lg w-full mx-4 space-y-4 text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-16 w-16 mx-auto text-error opacity-80"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-label="Error"
					>
						<title>Error</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z"
						/>
					</svg>
					<div>
						<h1 className="text-2xl font-bold">Something went wrong</h1>
						<p className="opacity-60 mt-1">
							The app couldn't load its configuration. Please contact your
							administrator.
						</p>
					</div>
					<div role="alert" className="alert alert-error text-left">
						<div>
							<p className="font-semibold text-sm">Technical details</p>
							<p className="text-sm opacity-80">
								{error?.message || "Unknown error"}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	const filteredGroups = config.groups.map((group) => {
		const filtered = group.apps.filter((app) => {
			const query = searchQuery.toLowerCase();
			return (
				app.name.toLowerCase().includes(query) ||
				(app.description?.toLowerCase().includes(query) ?? false)
			);
		});
		return { ...group, filteredApps: filtered };
	});

	return (
		<div className="min-h-screen bg-base-200">
			<Header
				title={config.title}
				logo={config.logo}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				theme={theme}
				mode={mode}
				onModeChange={setMode}
			/>

			<main className="max-w-7xl mx-auto px-4 py-12">
				{filteredGroups.every((g) => g.filteredApps.length === 0) ? (
					<p className="text-center opacity-60">No apps found</p>
				) : (
					filteredGroups.map((group) => (
						<GroupSection
							key={group.name}
							group={group}
							filteredApps={group.filteredApps}
						/>
					))
				)}
			</main>
		</div>
	);
}

export default App;
