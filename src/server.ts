import { env } from './environments/envManager'
import { application } from './application'

/**
 * Run the server!
 */
const initServer = async () => {
  try {
    await application.listen({ port: env.PORT })
  } catch (err) {
    application.log.error(err)
    process.exit(1)
  }
}

initServer()
