import { Decrypter } from '@/application/protocols/cryptography'
import { LoadAccountByTokenRepository } from '@/application/protocols/db/account'
import { DbLoadAccountByToken } from '@/application/usecases/account'
import { throwError } from '../../domain/mocks'
import { mockDecrypter, mockLoadAccountByTokenRepository } from '../mocks'

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Deve chamar Decrypter com os valores corretos', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
  test('Deve retornar null se Decrypter retornar null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null!))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBe(null)
  })
  test('Deve chamar loadAccountByTokenRepository com os valores corretos', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })
  test('Deve retornar null se loadAccountByTokenRepository retornar null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null!))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
  test('Deve retornar um Id de uma account no sucesso', async () => {
    const { sut } = makeSut()
    const accountId = await sut.load('any_token', 'any_role')
    expect(accountId).toEqual({ id: 'any_id' })
  })
  test('Deve lan??ar erro se Decrypter lan??ar erro', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(throwError)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
  test('Deve lan??ar erro se loadAccountByTokenRepository lan??ar erro', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
})
