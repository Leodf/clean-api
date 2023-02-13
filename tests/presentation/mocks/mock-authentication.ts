import { Authentication } from '@/domain/usecases/account/authentication'
import { mockAuthenticationModel } from '../../domain/mocks'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
      return await Promise.resolve(mockAuthenticationModel())
    }
  }
  return new AuthenticationStub()
}
