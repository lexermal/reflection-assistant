/** @type {import('next').NextConfig} */
//to fix an issue with pino https://stackoverflow.com/questions/78200117/how-to-implement-pino-logger-in-a-next-js-typescript-monorepo-for-both-client
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['pino', 'pino-pretty']
    },
};

export default nextConfig;
