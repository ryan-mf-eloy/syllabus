import { FastifyReply, FastifyRequest } from 'fastify'

export const checkSessionIdExist = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply | void> => {
  const notExistSessionId = !request.cookies.sessionId

  if (notExistSessionId)
    return reply.send({ message: 'User not authorized' }).code(401)
}
