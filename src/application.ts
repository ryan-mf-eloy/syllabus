import Fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionRoutes } from './http/routes/transactions'

export const application = Fastify({ logger: true })

application.register(cookie)

application.register(transactionRoutes, { prefix: 'transactions' })
