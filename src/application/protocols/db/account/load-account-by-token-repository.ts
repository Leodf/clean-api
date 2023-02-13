import { LoadAccountByToken } from '@/domain/usecases/account'

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<LoadAccountByTokenRepository.Result>
}

export namespace LoadAccountByTokenRepository {
  export type Result = LoadAccountByToken.Result
}
