import { ExternalLink } from "lucide-react";
import type { App } from "../types";
import { AppIcon } from "./AppIcon";

interface AppCardProps {
	app: App;
}

export function AppCard({ app }: AppCardProps) {
	const isMulti = app.urls && app.urls.length > 0;

	if (isMulti) {
		return (
			<div className="card card-bordered bg-base-100">
				<div className="card-body p-4 gap-2 items-start">
					<div className="flex items-center gap-3">
						<div className="flex-shrink-0">
							<AppIcon icon={app.icon} />
						</div>
						<h3 className="card-title text-base truncate">{app.name}</h3>
					</div>
					{app.description && (
						<p className="text-sm opacity-70 line-clamp-2">{app.description}</p>
					)}
					<ul className="list w-full">
						{app.urls?.map((entry) => (
							<li key={entry.label} className="list-row items-center py-1">
								<span className="list-col-grow text-sm">{entry.label}</span>
								<a
									href={entry.url}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-square btn-ghost btn-sm"
								>
									<ExternalLink size={14} />
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}

	return (
		<a
			href={app.url}
			target="_blank"
			rel="noopener noreferrer"
			className="card card-bordered bg-base-100 hover:shadow-lg transition-shadow"
		>
			<div className="card-body p-4 gap-2">
				<div className="flex items-center gap-3">
					<div className="flex-shrink-0">
						<AppIcon icon={app.icon} />
					</div>
					<h3 className="card-title text-base truncate">{app.name}</h3>
				</div>
				{app.description && (
					<p className="text-sm opacity-70 line-clamp-2">{app.description}</p>
				)}
			</div>
		</a>
	);
}
