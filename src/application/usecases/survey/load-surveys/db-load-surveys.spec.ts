import { LoadSurveysRepository } from './db-load-surveys-protocols'
import { DbLoadSurveys } from './db-load-surveys'
import MockDate from 'mockdate'
import { mockLoadSurveysRepository } from '@/application/tests'
import { throwError, mockSurveys } from '@/domain/tests'

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
  test('Deve chamar o LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
  test('Deve retornar uma lista de surveys no sucesso', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(mockSurveys())
  })
  test('Deve lançar erro se LoadSurveysRepository lançar erro', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
