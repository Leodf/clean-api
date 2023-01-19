import { Controller } from '../../../presentation/protocols'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { makeLoginValidation } from './login-validation-factory'
import { DbAuthentication } from '../../../application/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { BCryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../config/env'

export const makeLoginController = (): Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BCryptAdapter(env.salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const authentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(authentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
