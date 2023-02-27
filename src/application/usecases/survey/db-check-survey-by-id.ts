import { type CheckSurveyByIdRepository } from '@/application/protocols/db/survey'
import { type CheckSurveyById } from '@/domain/usecases/survey'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (private readonly checkByIdRepository: CheckSurveyByIdRepository) {}

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    const exists = await this.checkByIdRepository.checkById(id)
    return exists
  }
}
