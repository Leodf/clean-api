import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { mockSurveys } from '../../domain/mocks'

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (accountId: string): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveys())
    }
  }
  return new LoadSurveysStub()
}
