import { AddSurveyRepository } from '@/application/protocols/db/survey'
import { DbAddSurvey } from '@/application/usecases/survey'
import MockDate from 'mockdate'
import { mockSurveyParams, throwError } from '../../domain/mocks'
import { mockAddSurveyRepository } from '../mocks'

interface SutTypes {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Deve chamar AddSurveyRepository com os valores corretos', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const surveyData = mockSurveyParams()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
  test('Deve lançar erro se AddSurveyRepository lançar erro', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
    const surveyData = mockSurveyParams()
    const promise = sut.add(surveyData)
    await expect(promise).rejects.toThrow()
  })
})
