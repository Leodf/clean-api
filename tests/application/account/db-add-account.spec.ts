import { Hasher } from '@/application/protocols/cryptography'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/application/protocols/db/account'
import { DbAddAccount } from '@/application/usecases/account'
import { mockAddAccountParams, throwError } from '../../domain/mocks'
import { mockHasher, mockAddAccountRepository, mockCheckAccountByEmailRepository } from '../mocks'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  checkAccountByEmailRepositoryStub: CheckAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const checkAccountByEmailRepositoryStub = mockCheckAccountByEmailRepository()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, checkAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    checkAccountByEmailRepositoryStub
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

  test('Deve retornar false se addAccountRepository retornar null', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(false))
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBeFalsy()
  })

  test('Deve retornar true para criar account no sucesso', async () => {
    const { sut } = makeSut()
    const accountData = mockAddAccountParams()
    const isValid = await sut.add(accountData)
    expect(isValid).toBeTruthy()
  })
  test('Deve retornar false se CheckAccountByEmailRepository retornar uma account', async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail').mockReturnValueOnce(Promise.resolve(true))
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBeFalsy()
  })

  test('Deve chamar CheckAccountByEmailRepository com o email correto', async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut()
    const checkByEmailSpy = jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail')
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(checkByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
