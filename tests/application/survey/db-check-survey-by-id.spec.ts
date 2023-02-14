import { CheckSurveyByIdRepository } from '@/application/protocols/db/survey'
import { DbCheckSurveyById } from '@/application/usecases/survey'
import { throwError } from '../../domain/mocks'
import { mockCheckSurveyByIdRepository } from '../mocks'

  type SutTypes = {
    sut: DbCheckSurveyById
    checkSurveyByIdRepositoryStub: CheckSurveyByIdRepository
  }

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositoryStub = mockCheckSurveyByIdRepository()
  const sut = new DbCheckSurveyById(checkSurveyByIdRepositoryStub)
  return {
    sut,
    checkSurveyByIdRepositoryStub
  }
}
describe('DbCheckSurveyById', () => {
  test('Deve chamar o checkSurveyByIdRepository', async () => {
    const { sut, checkSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(checkSurveyByIdRepositoryStub, 'checkById')
    await sut.checkById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
  test('Deve retornar false se checkSurveyByIdRepository retornar false', async () => {
    const { sut, checkSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(checkSurveyByIdRepositoryStub, 'checkById').mockReturnValueOnce(Promise.resolve(false))
    const exists = await sut.checkById('any_id')
    expect(exists).toBeFalsy()
  })
  test('Deve retornar true se checkSurveyByIdRepository retornar true', async () => {
    const { sut } = makeSut()
    const exists = await sut.checkById('any_id')
    expect(exists).toBeTruthy()
  })
  test('Deve lançar erro se checkSurveyByIdRepository lançar erro', async () => {
    const { sut, checkSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(checkSurveyByIdRepositoryStub, 'checkById').mockImplementationOnce(throwError)
    const promise = sut.checkById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
