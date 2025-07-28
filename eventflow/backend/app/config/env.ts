import "dotenv/config";
import * as z from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(4000),
  MONGO_URI: z.string().url(),
  JWT_SECRET: z.string().min(10),
  JWT_REFRESH_SECRET: z.string().min(10)
});

type envServer = z.infer<typeof envSchema>;
export const parsedEnv: envServer = envSchema.parse(process.env);

