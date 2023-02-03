import { SurveyModel } from '@/domain/models/survey'
import { mockSurveys } from '@/domain/tests'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => { resolve(mockSurveys()) })
    }
  }
  return new LoadSurveysStub()
}
