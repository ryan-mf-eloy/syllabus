import { Knex, knex as setupKnex } from 'knex'
import { resolve } from 'node:path'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: resolve('src/shared/infra/database/app.db'),
  },
  migrations: {
    extension: 'ts',
    directory: resolve('src/shared/infra/database/migrations'),
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)
