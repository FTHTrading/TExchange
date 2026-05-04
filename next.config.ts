import path from "node:path";
import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
	turbopack: {
		root: repoRoot,
	},
	serverExternalPackages: ["better-sqlite3"],
	experimental: {
		cpus: 1,
		workerThreads: false,
	},

};

export default nextConfig;
