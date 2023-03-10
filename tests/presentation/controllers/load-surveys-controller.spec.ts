import { LoadSurveysController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helpers/http-helper'
import { LoadSurveys } from '@/domain/usecases/survey'
import MockDate from 'mockdate'
import { mockLoadSurveys } from '@/../tests/presentation/mocks'
import { mockSurveys, throwError } from '@/../tests/domain/mocks'

const mockRequest = (): LoadSurveysController.Request => ({
  accountId: 'any_id'
})

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}
describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Deve chamar LoadSurveys com valores corretos', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const request = mockRequest()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle(request)
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })
  test('Deve retornar 200 no sucesso', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveys()))
  })
  test('Deve retornar 204 se LoadSurvey retornar vazio', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
  test('Deve retornar 500 se LoadSurveys lancar erro', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
