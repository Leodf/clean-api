import { Encrypter } from '@/application/protocols/cryptography/encrypter'
import jwt from 'jsonwebtoken'
import { Decrypter } from '@/application/protocols/cryptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string> {
    const value = await jwt.verify(token, this.secret)
    return value as string
  }
}
