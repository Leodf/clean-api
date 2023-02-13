import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { mockAccountModel } from '../../domain/mocks'

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string | undefined): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenStub()
}
