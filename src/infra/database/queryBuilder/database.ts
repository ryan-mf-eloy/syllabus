import { knex as setupKnex, Knex } from 'knex'
import { resolve } from 'node:path'
import { env } from '../../../environments/envManager'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: resolve(env.DATABASE_URL),
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: resolve(env.MIGRATIONS_URL),
  },
}

export const knex = setupKnex(config)
