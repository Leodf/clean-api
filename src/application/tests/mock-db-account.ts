import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AddAccountRepository } from '@/application/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/application/protocols/db/account/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '@/application/protocols/db/account/load-account-by-token-repository'
import { UpdateAccessTokenRepository } from '@/application/protocols/db/account/update-access-token-repository'
import { mockAccountModel } from '@/domain/tests'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(mockAccountModel()) })
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(mockAccountModel()) })
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(mockAccountModel()) })
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      await new Promise<void>(resolve => { resolve() })
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
