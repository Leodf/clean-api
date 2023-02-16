import { LoadSurveyByIdRepository } from '@/application/protocols/db/survey'
import { LoadAnswersBySurvey } from '@/domain/usecases/survey'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (private readonly loadByIdRepository: LoadSurveyByIdRepository) {}

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    const survey = await this.loadByIdRepository.loadById(id)
    return survey?.answers.map(item => item.answer) || []
  }
}
