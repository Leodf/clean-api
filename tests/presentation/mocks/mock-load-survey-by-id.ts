import { CheckSurveyById } from '@/domain/usecases/survey'
import { LoadAnswersBySurvey } from '@/domain/usecases/survey/load-answers-by-survey'
import { mockSurvey } from '../../domain/mocks'

export const mockLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  class LoadSurveyByIdStub implements LoadAnswersBySurvey {
    async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
      return await Promise.resolve(mockSurvey().answers.map(item => item.answer))
    }
  }
  return new LoadSurveyByIdStub()
}

export const mockCheckSurveyById = (): CheckSurveyById => {
  class CheckSurveyByIdStub implements CheckSurveyById {
    async checkById (id: string): Promise<CheckSurveyById.Result> {
      return await Promise.resolve(true)
    }
  }
  return new CheckSurveyByIdStub()
}
