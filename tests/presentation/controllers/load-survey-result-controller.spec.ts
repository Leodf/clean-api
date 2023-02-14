import { LoadSurveyResultController } from '@/presentation/controllers'
import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { LoadSurveyResult } from '@/domain/usecases/survey-result'
import MockDate from 'mockdate'
import { mockLoadSurveyResult, mockCheckSurveyById } from '@/../tests/presentation/mocks'
import { throwError, mockSurveyResultModel } from '@/../tests/domain/mocks'
import { CheckSurveyById } from '@/domain/usecases/survey'

const mockRequest = (): LoadSurveyResultController.Request => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id'
})

type SutTypes = {
  sut: LoadSurveyResultController
  checkSurveyByIdStub: CheckSurveyById
  loadSurveyResultStub: LoadSurveyResult
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdStub = mockCheckSurveyById()
  const loadSurveyResultStub = mockLoadSurveyResult()
  const sut = new LoadSurveyResultController(checkSurveyByIdStub, loadSurveyResultStub)
  return {
    sut,
    checkSurveyByIdStub,
    loadSurveyResultStub
  }
}
describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Deve chamar checkSurveyById com os valores corretos', async () => {
    const { sut, checkSurveyByIdStub } = makeSut()
    const checkByIdSpy = jest.spyOn(checkSurveyByIdStub, 'checkById')
    await sut.handle(mockRequest())
    expect(checkByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
  test('Deve retornar 403 se checkSurveyById retornar false', async () => {
    const { sut, checkSurveyByIdStub } = makeSut()
    jest.spyOn(checkSurveyByIdStub, 'checkById').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })
  test('Deve retornar 500 se checkSurveyById lancar erro', async () => {
    const { sut, checkSurveyByIdStub } = makeSut()
    jest.spyOn(checkSurveyByIdStub, 'checkById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Deve chamar LoadSurveyResult com os valores corretos', async () => {
    const { sut, loadSurveyResultStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_survey_id', 'any_account_id')
  })
  test('Deve retornar 500 se LoadSurveyResult lancar erro', async () => {
    const { sut, loadSurveyResultStub } = makeSut()
    jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Deve retornar 200 no sucesso', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
