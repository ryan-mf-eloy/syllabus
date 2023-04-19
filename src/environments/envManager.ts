import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') config({ path: '.env.test' })

config()

const envSchema = z.object({
  // SERVER
  NODE_ENV: z
    .enum(['local', 'test', 'homologation', 'production'])
    .default('production'),
  PORT: z.number().default(1338),

  // DATABASE
  DATABASE_URL: z.string(),
  MIGRATIONS_URL: z.string(),
})

const safeParsedEnvs = envSchema.safeParse(process.env)

if (safeParsedEnvs.success === false) {
  const errorsArray = Object.entries(safeParsedEnvs.error.format()).slice(1)

  const filteredErrors = errorsArray.map((err) => {
    const errorMessage = (err[1] as unknown as { _errors: string })._errors[0]
    return `ENV: ${err[0]} -> ERROR: ${errorMessage}`
  })

  const formattedFilteredErrorMessage = filteredErrors.reduce((acc, err) => {
    return (acc += `${err}\n`)
  }, ``)

  throw new Error(formattedFilteredErrorMessage)
}

export const env = safeParsedEnvs.data
