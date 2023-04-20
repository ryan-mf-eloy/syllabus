import Fastify from 'fastify'

// Routes
import routesPlugin from './http/routes/routesPlugin'

const app = Fastify({
  logger: true,
})

app.register(routesPlugin, {
  prefix: 'diet',
})

export default app
