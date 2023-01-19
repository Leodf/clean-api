import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => { resolve('any_token') })
  }
}))

describe('Jwt Adapter', () => {
  test('Deve chamar sign com os valores corretos', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
  test('Deve retornar um token no sucesso', async () => {
    const sut = new JwtAdapter('secret')
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })
  test('Deve lancar erro se sign lancar erro', async () => {
    const sut = new JwtAdapter('secret')
    jest.spyOn(jwt, 'sign').mockImplementationOnce(async () => { await new Promise((resolve, reject) => { reject(new Error()) }) })
    const promise = sut.encrypt('any_id')
    await expect(promise).rejects.toThrow()
  })
})
