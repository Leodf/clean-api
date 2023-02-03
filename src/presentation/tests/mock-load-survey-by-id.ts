import { SurveyModel } from '@/domain/models/survey'
import { mockSurvey } from '@/domain/tests'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => { resolve(mockSurvey()) })
    }
  }
  return new LoadSurveyByIdStub()
}
