import swaggerConfig from '@/main/docs'
import { noCacheSwagger } from '@/main/middlewares/no-cache-swagger'
import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'

export default (app: Express): void => {
  app.use('/api-docs', noCacheSwagger, serve, setup(swaggerConfig))
}
