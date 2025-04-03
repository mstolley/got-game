import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'thronesapi.com',
				port: '',
				pathname: '/assets/images/**',
				search: '',
			},
		],
	},
};

export default nextConfig;
