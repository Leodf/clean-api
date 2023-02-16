import { LoadSurveyByIdRepository } from '@/application/protocols/db/survey'
import { DbLoadAnswersBySurvey } from '@/application/usecases/survey'
import MockDate from 'mockdate'
import { mockSurvey, throwError } from '../../domain/mocks'
import { mockLoadSurveyByIdRepository } from '../mocks'

  type SutTypes = {
    sut: DbLoadAnswersBySurvey
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
  }

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadAnswersBySurvey(loadSurveyByIdRepositoryStub)
  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}
describe('DbLoadSurveyById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('Deve chamar o LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadAnswers('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
  test('Deve retornar anwers no sucesso', async () => {
    const { sut } = makeSut()
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual([
      mockSurvey().answers[0].answer,
      mockSurvey().answers[1].answer
    ])
  })
  test('Deve retornar um array vazio se LoadSurveyByIdRepository retornar null', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual([])
  })
  test('Deve lançar erro se LoadSurveyByIdRepository lançar erro', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadAnswers('any_id')
    await expect(promise).rejects.toThrow()
  })
})
