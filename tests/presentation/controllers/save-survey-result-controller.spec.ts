import { forbidden, ok, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { SaveSurveyResult } from '@/domain/usecases/survey-result'
import { LoadAnswersBySurvey } from '@/domain/usecases/survey'
import MockDate from 'mockdate'
import { mockLoadAnswersBySurvey, mockSaveSurveyResult } from '@/../tests/presentation/mocks'
import { throwError, mockSurveyResultModel } from '@/../tests/domain/mocks'

const mockRequest = (): SaveSurveyResultController.Request => ({
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  accountId: 'any_account_id'
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadAnswersBySurveyStub: LoadAnswersBySurvey
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyStub = mockLoadAnswersBySurvey()
  const saveSurveyResultStub = mockSaveSurveyResult()
  const sut = new SaveSurveyResultController(loadAnswersBySurveyStub, saveSurveyResultStub)
  return {
    sut,
    loadAnswersBySurveyStub,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Deve chamar LoadSurveyById com os valores corretos', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAnswersBySurveyStub, 'loadAnswers')
    const request = mockRequest()
    await sut.handle(request)
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
  test('Deve retornar 403 se LoadSurveyById retornar null', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyStub, 'loadAnswers').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })
  test('Deve retornar 500 se LoadSurveyById lancar erro', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyStub, 'loadAnswers').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Deve retornar 403 se uma answer invalida for fornecida', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      surveyId: 'any_survey_id',
      answer: 'wrong_answer',
      accountId: 'any_account_id'
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })
  test('Deve chamar SaveSurveyResult com os valores corretos', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(mockRequest())
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      date: new Date(),
      answer: 'any_answer'
    })
  })
  test('Deve retornar 500 se SaveSurveyResult lancar erro', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Deve retornar 200 no sucesso', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()))
  })
})
