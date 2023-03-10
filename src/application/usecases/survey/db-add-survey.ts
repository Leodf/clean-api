import { type AddSurveyRepository } from '@/application/protocols/db/survey'
import { type AddSurvey } from '@/domain/usecases/survey'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (data: AddSurvey.Params): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
