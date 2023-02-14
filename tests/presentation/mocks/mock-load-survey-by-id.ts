import { CheckSurveyById } from '@/domain/usecases/survey'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { mockSurvey } from '../../domain/mocks'

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<LoadSurveyById.Result> {
      return await Promise.resolve(mockSurvey())
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
