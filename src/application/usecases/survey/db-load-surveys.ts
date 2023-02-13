import { LoadSurveysRepository } from '@/application/protocols/db/survey'
import { LoadSurveys } from '@/domain/usecases/survey'
import { SurveyModel } from '@/domain/models'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId)
    return surveys
  }
}
