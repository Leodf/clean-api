import { type LoadAnswersBySurveyRepository } from '@/application/protocols/db/survey'
import { type LoadAnswersBySurvey } from '@/domain/usecases/survey'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (private readonly loadAnswersBySurveyRepository: LoadAnswersBySurveyRepository) {}

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    const answers = await this.loadAnswersBySurveyRepository.loadAnswers(id)
    return answers
  }
}
