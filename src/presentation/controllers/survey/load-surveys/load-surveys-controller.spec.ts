import { LoadSurveysController } from './load-surveys-controller'
import { HttpRequest, LoadSurveys } from './load-surveys-controller-protocols'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { throwError, mockSurveys } from '@/domain/tests'
import { mockLoadSurveys } from '@/presentation/tests'

const mockRequest = (): HttpRequest => ({
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
    const HttpRequest = mockRequest()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle(HttpRequest)
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
