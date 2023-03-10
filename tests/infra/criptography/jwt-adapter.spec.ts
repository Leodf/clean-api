import { JwtAdapter } from '@/infra/criptography'
import { throwError } from '../../domain/mocks'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await Promise.resolve('any_token')
  },
  async verify (): Promise<string> {
    return await Promise.resolve('any_value')
  }
}))
const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}
describe('Jwt Adapter', () => {
  describe('sign()', () => {
    test('Deve chamar sign com os valores corretos', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })
    test('Deve retornar um token no sucesso', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })
    test('Deve lancar erro se sign lancar erro', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
  describe('verify()', () => {
    test('Deve chamar verify com os valores corretos', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })
    test('Deve retornar um valor no sucesso do verify', async () => {
      const sut = makeSut()
      const value = await sut.decrypt('any_token')
      expect(value).toBe('any_value')
    })
    test('Deve lancar erro se verify lancar erro', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow()
    })
  })
})
