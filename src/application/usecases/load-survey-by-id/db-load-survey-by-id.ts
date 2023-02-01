import { LoadSurveyByIdRepository, SurveyModel, LoadSurveyById } from './db-load-survey-by-id-protocols'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadByIdRepository.loadById(id)
    return survey
  }
}
