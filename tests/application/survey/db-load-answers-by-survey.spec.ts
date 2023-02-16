import { LoadAnswersBySurveyRepository } from '@/application/protocols/db/survey'
import { DbLoadAnswersBySurvey } from '@/application/usecases/survey'
import MockDate from 'mockdate'
import { mockSurvey, throwError } from '../../domain/mocks'
import { mockLoadAnswersBySurveyRepository } from '../mocks'

  type SutTypes = {
    sut: DbLoadAnswersBySurvey
    loadAnswersBySurveyRepositoryStub: LoadAnswersBySurveyRepository
  }

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyRepositoryStub = mockLoadAnswersBySurveyRepository()
  const sut = new DbLoadAnswersBySurvey(loadAnswersBySurveyRepositoryStub)
  return {
    sut,
    loadAnswersBySurveyRepositoryStub
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
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut()
    const loadAnswersSpy = jest.spyOn(loadAnswersBySurveyRepositoryStub, 'loadAnswers')
    await sut.loadAnswers('any_id')
    expect(loadAnswersSpy).toHaveBeenCalledWith('any_id')
  })
  test('Deve retornar anwers no sucesso', async () => {
    const { sut } = makeSut()
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual([
      mockSurvey().answers[0].answer,
      mockSurvey().answers[1].answer
    ])
  })
  test('Deve retornar um array vazio se LoadAnswersBySurveyRepository se nao existir survey', async () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyRepositoryStub, 'loadAnswers').mockReturnValueOnce(Promise.resolve([]))
    const answers = await sut.loadAnswers('any_id')
    expect(answers).toEqual([])
  })
  test('Deve lançar erro se LoadSurveyByIdRepository lançar erro', async () => {
    const { sut, loadAnswersBySurveyRepositoryStub } = makeSut()
    jest.spyOn(loadAnswersBySurveyRepositoryStub, 'loadAnswers').mockImplementationOnce(throwError)
    const promise = sut.loadAnswers('any_id')
    await expect(promise).rejects.toThrow()
  })
})
