import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { mockAccountModel } from '../../domain/mocks'

export const mockAddAccount = (): AddAccount => {
  class AddAcountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new AddAcountStub()
}
