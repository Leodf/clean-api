import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { type LoadAnswersBySurvey } from '@/domain/usecases/survey'
import { type SaveSurveyResult } from '@/domain/usecases/survey-result'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadAnswersBySurvey: LoadAnswersBySurvey,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, answer } = request
      const answers = await this.loadAnswersBySurvey.loadAnswers(surveyId)
      if (!answers.length) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'))
      }
      const surveyResult = await this.saveSurveyResult.save({
        ...request,
        date: new Date()
      })
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string
    answer: string
    accountId: string
  }
}
