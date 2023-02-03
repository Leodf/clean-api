import { Hasher, AccountModel, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'
import { mockAccountModel, mockAddAccountParams, throwError } from '@/domain/tests'
import { mockHasher, mockAddAccountRepository } from '@/application/tests'

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(null!) })
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}
describe('DbAddAccount Usecase', () => {
  test('Deve chamar Hasher com o parametro correto senha', async () => {
    const { sut, hasherStub } = makeSut()
    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })

  test('Deve lançar erro se Hasher lançar erro', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Deve chamar AddAccountRepository com os valores corretos', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Deve lançar erro se AddAccountRepository lançar erro', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Deve retornar uma account no sucesso', async () => {
    const { sut } = makeSut()
    const accountData = mockAddAccountParams()
    const account = await sut.add(accountData)
    expect(account).toEqual(mockAccountModel())
  })
  test('Deve retornar null se LoadAccountByEmailRepository não retornar null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => { resolve(mockAccountModel()) }))
    const account = await sut.add(mockAddAccountParams())
    expect(account).toBeNull()
  })
  test('Deve chamar LoadAccountByEmailRepository com o email correto', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
