import { loginPath, signPath, surveyPath, surveyResultPath } from '@/main/docs/paths'
import { accountSchema, loginParamsSchema, signUpParamsSchema, errorSchema, surveySchema, surveysSchema, surveyAnswerSchema, apiKeyAuthSchema, addSurveyParamsSchema, saveSurveyParamsSchema, surveyResultSchema } from '@/main/docs/schemas'
import { badRequest, serverError, unauthorized, notFound, forbidden } from '@/main/docs/components'

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
  }, {
    name: 'Enquete'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signPath,
    '/surveys': surveyPath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    addSurveyParams: addSurveyParamsSchema,
    saveSurveyResultParams: saveSurveyParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    surveyResult: surveyResultSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    unauthorized,
    notFound,
    forbidden,
    serverError
  }
}
