import { type LoadSurveysRepository } from '@/application/protocols/db/survey'
import { type LoadSurveys } from '@/domain/usecases/survey'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<LoadSurveys.Result> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId)
    return surveys
  }
}
