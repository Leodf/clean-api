import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('Deve chamar o bcypt com o valor correto', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
