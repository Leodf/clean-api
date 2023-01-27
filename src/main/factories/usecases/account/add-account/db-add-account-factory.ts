import { DbAddAccount } from '../../../../../application/usecases/add-account/db-add-account'
import { AddAccount } from '../../../../../domain/usecases/add-account'
import { BCryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import env from '../../../../config/env'

export const makeDbAddAccount = (): AddAccount => {
  const bcryptAdapter = new BCryptAdapter(env.salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
