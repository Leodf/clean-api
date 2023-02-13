import { LoadSurveyByIdRepository } from '@/application/protocols/db/survey'
import { LoadSurveyResultRepository } from '@/application/protocols/db/survey-result'
import { DbLoadSurveyResult } from '@/application/usecases/survey-result'
import MockDate from 'mockdate'
import { throwError, mockSurveyResultModel } from '../../domain/mocks'
import { mockLoadSurveyResultRepository, mockLoadSurveyByIdRepository } from '../mocks'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
  LoadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const LoadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, LoadSurveyByIdRepositoryStub)
  return {
    sut,
    loadSurveyResultRepositoryStub,
    LoadSurveyByIdRepositoryStub
  }
}

describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Deve chamar LoadSurveyResultRepository com os valores corretos', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id', 'any_account_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id', 'any_account_id')
  })
  test('Deve lançar erro se LoadSurveyResultRepository lançar erro', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.load('any_survey_id', 'any_account_id')
    await expect(promise).rejects.toThrow()
  })
  test('Deve chamar LoadSurveyByIdRepository se LoadSurveyResultRepository retornar null', async () => {
    const { sut, loadSurveyResultRepositoryStub, LoadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(LoadSurveyByIdRepositoryStub, 'loadById')
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    await sut.load('any_survey_id', 'any_account_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
  test('Deve retornar um SurveyResultModel com todas as respostas com count 0 se LoadSurveyByIdRepositoryStub retornar null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    const surveyResult = await sut.load('any_survey_id', 'any_account_id')
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
  test('Deve retonar surveyResultModel no sucesso', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.load('any_survey_id', 'any_account_id')
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
