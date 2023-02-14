import { LoadSurveyByIdRepository } from '@/application/protocols/db/survey'
import { LoadSurveyById } from '@/domain/usecases/survey'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<LoadSurveyById.Result> {
    const survey = await this.loadByIdRepository.loadById(id)
    return survey
  }
}
