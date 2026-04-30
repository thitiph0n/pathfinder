import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { setIconResolver } from "./iconRegistry.ts";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

import("./components/IconResolver").then((module) => {
	setIconResolver(module.default);
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
});
