import { LoadSurveyByIdRepository } from '@/application/protocols/db/survey'
import { LoadSurveyById } from '@/domain/usecases/survey'
import { SurveyModel } from '@/domain/models'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadByIdRepository.loadById(id)
    return survey
  }
}
