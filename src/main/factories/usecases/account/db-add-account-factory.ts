import { DbAddAccount } from '@/application/usecases/account/db-add-account'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { BCryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/repository/account-mongo-repository'
import env from '@/main/config/env'

export const makeDbAddAccount = (): AddAccount => {
  const bcryptAdapter = new BCryptAdapter(env.salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
