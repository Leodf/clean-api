import { LoadSurveysRepository } from '@/application/usecases/survey/load-surveys/db-load-surveys-protocols'
import { DbLoadSurveys } from '@/application/usecases/survey/load-surveys/db-load-surveys'
import MockDate from 'mockdate'
import { mockLoadSurveysRepository } from '../mocks'
import { mockSurveys, throwError } from '../../domain/mocks'

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Deve chamar o LoadSurveysRepository com os valores corretos', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load('any_id')
    expect(loadAllSpy).toHaveBeenCalledWith('any_id')
  })
  test('Deve retornar uma lista de surveys no sucesso', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load('any_id')
    expect(surveys).toEqual(mockSurveys())
  })
  test('Deve lançar erro se LoadSurveysRepository lançar erro', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load('any_id')
    await expect(promise).rejects.toThrow()
  })
})
