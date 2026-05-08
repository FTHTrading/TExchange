import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{ source: "/exchange-o", destination: "/exchange-os", permanent: true },
			{ source: "/exchange-o/:path*", destination: "/exchange-os/:path*", permanent: true },
			{ source: "/live-dex", destination: "/exchange-os", permanent: false },
			{ source: "/live-dex/:path*", destination: "/exchange-os/:path*", permanent: false },
		];
	},
	turbopack: {
		root: process.cwd(),
	},
	serverExternalPackages: ["better-sqlite3", "@solana/web3.js"],
	experimental: {
		cpus: 1,
		workerThreads: false,
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			// Solana web3.js expects these Node built-ins; use browser stubs
			config.resolve = config.resolve ?? {};
			config.resolve.fallback = {
				...(config.resolve.fallback as Record<string, unknown>),
				crypto: false,
				stream: false,
				buffer: false,
				url: false,
				https: false,
				http: false,
				zlib: false,
				path: false,
				fs: false,
			};
		}
		return config;
	},
};

export default nextConfig;
