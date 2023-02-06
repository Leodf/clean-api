import { apiKeyAuthSchema } from './schemas/api-key-auth-schema'
import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
} from '@/main/docs/components/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  unauthorized,
  notFound,
  forbidden,
  serverError
}
