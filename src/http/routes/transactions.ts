import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import { knex } from '../../infra/database/queryBuilder/database'
import { z } from 'zod'

import { checkSessionIdExist } from '../middleware/checkSessionIdExist'

export const transactionRoutes = async (application: FastifyInstance) => {
  application.addHook('preHandler', async (request, reply) => {})

  application.post('/', async (request, reply) => {
    try {
      const createTransactionBodySchema = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(['credit', 'debit']),
      })

      const { title, amount, type } = createTransactionBodySchema.parse(
        request.body,
      )

      const notExistSessionId = !request.cookies.sessionId
      let sessionId = request.cookies.sessionId

      if (notExistSessionId) {
        sessionId = randomUUID()
        reply.cookie('sessionId', sessionId, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        })
      }

      const transaction = await knex('transactions')
        .insert({
          id: randomUUID(),
          title,
          amount: type === 'credit' ? amount : amount * -1,
          session_id: sessionId,
        })
        .returning('*')

      return reply.status(201).send({
        transaction,
        message: 'Transaction created successfully',
      })
    } catch ({ message }: any) {
      reply.status(500).send({ message })
    }
  })

  application.get(
    '/summary',
    {
      preHandler: checkSessionIdExist,
    },
    async (request, reply) => {
      try {
        const { sessionId } = request.cookies

        const summary = await knex('transactions')
          .where('session_id', sessionId)
          .sum('amount', {
            as: 'amount',
          })
          .first()

        return reply.status(200).send({
          summary,
          message: 'Summary got successfully',
        })
      } catch ({ message }: any) {
        reply.status(500).send({ message })
      }
    },
  )

  application.get(
    '/',
    {
      preHandler: checkSessionIdExist,
    },
    async (request, reply) => {
      try {
        const { sessionId } = request.cookies

        const transactions = await knex('transactions')
          .where('session_id', sessionId)
          .select()

        return reply.status(200).send({
          transactions,
          message: 'Transactions listed successfully',
        })
      } catch ({ message }: any) {
        reply.status(500).send({ message })
      }
    },
  )

  application.get(
    '/:id',
    {
      preHandler: checkSessionIdExist,
    },
    async (request, reply) => {
      try {
        const { sessionId } = request.cookies

        const getTransactionParamsSchema = z.object({
          id: z.string().uuid(),
        })

        const { id } = getTransactionParamsSchema.parse(request.params)

        const transaction = await knex('transactions')
          .where({
            id,
            session_id: sessionId,
          })
          .first()

        return reply.status(200).send({
          transaction,
          message: 'Transaction listed successfully',
        })
      } catch ({ message }: any) {
        reply.status(500).send({ message })
      }
    },
  )
}
