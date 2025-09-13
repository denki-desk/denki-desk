import * as z from 'zod';

const EnvSchema = z.object({
  // app-specific envs
  API_URL: z.string(),
  ENABLE_API_MOCKING: z
    .string()
    .refine((s) => s === 'true' || s === 'false')
    .transform((s) => s === 'true')
    .optional(),

  // vite defaults
  MODE: z.enum(['development', 'production', 'test']),
  DEV: z.boolean(),
  PROD: z.boolean(),
  SSR: z.boolean(),
});

const createEnv = () => {
  // collect custom vars (with VITE_APP_ prefix)
  const appEnvVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    if (key.startsWith('VITE_APP_')) {
      acc[key.replace('VITE_APP_', '')] = value;
    }
    return acc;
  }, {});

  // merge built-in vite vars
  const merged = {
    ...appEnvVars,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    SSR: import.meta.env.SSR,
  };

  const parsedEnv = EnvSchema.safeParse(merged);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join('\n')}`
    );
  }

  return parsedEnv.data;
};

export const env: z.infer<typeof EnvSchema> = createEnv();
