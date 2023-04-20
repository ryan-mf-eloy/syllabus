import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

const routesPlugin = async (app: FastifyInstance) => {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send('API ON')
  })
}

export default routesPlugin
