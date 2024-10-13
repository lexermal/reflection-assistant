import { unstable_noStore as noStore } from 'next/cache';

noStore();

if (typeof window !== "undefined") {
    console.error("This file is only allowed be imported on server side. Currently it's imported on client side.");
    console.log(new Error().stack);
}

export type Env = typeof env;

export const env = {
    // SUPABASE_URL: getEnv('SUPABASE_URL'),
    // SUPABASE_ANON_KEY: getEnv('SUPABASE_ANON_KEY'),
    ANTHROPIC_API_KEY: getEnv('ANTHROPIC_API_KEY'),
    // ELEVENLABS_API_KEY: getEnv('ELEVENLABS_API_KEY'),
    // OPENAI_API_KEY: getEnv('OPENAI_API_KEY'),
    LOGGING_BACKEND_URL: getEnv("LOGGING_BACKEND_URL"),
    LOGGING_USERNAME: getEnv("LOGGING_USERNAME"),
    LOGGING_PASSWORD: getEnv("LOGGING_PASSWORD"),
};

function getEnv(name: string, defaultVal?: string): string {
    if (!process.env[name] && process.env[name] != "") {
        if (defaultVal !== undefined) {
            return defaultVal;
        }
        throw new Error(`Missing environment variable ${name}`)
    }
    return process.env[name] as string
}
