import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string | undefined): Promise<LoadAccountByToken.Result> {
      return await Promise.resolve({ id: 'any_id' })
    }
  }
  return new LoadAccountByTokenStub()
}
