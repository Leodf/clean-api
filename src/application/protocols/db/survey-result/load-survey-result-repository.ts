import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyById: string) => Promise<SurveyResultModel>
}
