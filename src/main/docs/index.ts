import { loginPath } from '@/main/docs/paths'
import { accountSchema, loginParamsSchema, errorSchema } from '@/main/docs/schemas'
import { badRequest, serverError, unauthorized, notFound } from '@/main/docs/components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Api',
    description: 'Api do curso do Mango para realizar enquetes',
    version: '2.2.0'
  },
  license: {
    name: 'MIT License',
    url: 'https://spdx.org/licenses/MIT.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    unauthorized,
    notFound,
    serverError
  }
}
