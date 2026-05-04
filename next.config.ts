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
		cpus: 2,
		workerThreads: false,
	},
	async rewrites() {
		return [
			{
				source: "/",
				has: [
					{
						type: "host",
						value: "troptionslive\\.unykorn\\.org",
					},
				],
				destination: "/troptions-live",
			},
			{
				source: "/",
				has: [
					{
						type: "host",
						value: ".*troptions-live.*",
					},
				],
				destination: "/troptions-live",
			},
		];
	},
};

export default nextConfig;
