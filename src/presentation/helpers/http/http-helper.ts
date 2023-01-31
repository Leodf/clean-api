import { UnauthorizeError } from '@/presentation/errors'
import { ServerError } from '@/presentation/errors/server-error'
import { HttpResponse } from '@/presentation/protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizeError()
})
export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})
export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
