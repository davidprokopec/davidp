import { z } from 'zod'

const baseSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number(),
})

export function getEnv<
  T extends z.ZodObject<z.ZodRawShape>,
  C extends z.ZodObject<z.ZodRawShape> | undefined = undefined,
>(
  schema: T,
  { source, customBase }: { source?: NodeJS.ProcessEnv; customBase?: C } = {},
): C extends z.ZodObject<z.ZodRawShape> ? z.infer<C> : z.infer<typeof baseSchema> & z.infer<T> {
  const envSchema =
    customBase || (schema.merge(baseSchema) as z.ZodType<z.infer<typeof baseSchema> & z.infer<T>>)
  const env = envSchema.safeParse(source || process.env)
  if (!env.success) {
    console.error('error while parsing env', env.error)
    process.exit(0)
    return
  }
  return env.data as any
}
