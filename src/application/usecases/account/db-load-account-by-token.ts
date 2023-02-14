import { Decrypter } from '@/application/protocols/cryptography'
import { LoadAccountByTokenRepository } from '@/application/protocols/db/account'
import { LoadAccountByToken } from '@/domain/usecases/account'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (token) {
      const accountId = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (accountId) {
        return accountId
      }
    }
    return null
  }
}
