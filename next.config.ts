import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	turbopack: {
		root: process.cwd(),
	},
	serverExternalPackages: ["better-sqlite3"],
	experimental: {
		cpus: 1,
		workerThreads: false,
	},

};

export default nextConfig;
