import { MissingParamError } from '@/presentation/errors'
import { unauthorized, serverError, badRequest, ok } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers'
import { Authentication } from '@/domain/usecases/account'
import { mockAuthenticationParams, throwError, mockAuthenticationModel } from '@/../tests/domain/mocks'
import { mockAuthentication, mockValidation } from '../mocks'

const mockRequest = (): LoginController.Request => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const validationStub = mockValidation()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}
describe('Login Controller', () => {
  test('Deve chamar a Authentication com os valores corretos', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const request = mockRequest()
    await sut.handle(request)
    expect(authSpy).toHaveBeenCalledWith(mockAuthenticationParams())
  })

  test('Deve retornar 401 se credenciais invalidas foram fornecidas', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null!))
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Deve retornar 500 se Authentication lançar erro', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError)
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Deve retornar 200 se as credenciais forem validas', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(mockAuthenticationModel()))
  })

  test('Deve chamar Validation com os valores corretos', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request)
  })
  test('Deve retornar status 400 se Validator retornar um erro', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
