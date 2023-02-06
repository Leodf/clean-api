import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/tests'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'

export const mockAddAccount = (): AddAccount => {
  class AddAcountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new AddAcountStub()
}
