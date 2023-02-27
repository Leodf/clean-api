import { type Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAthentication } from '@/main/factories/usecases/account/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAthentication(), makeLoginValidation())
  return makeLogControllerDecorator(loginController)
}
