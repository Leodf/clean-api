import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyById: string, accountId: string) => Promise<SurveyResultModel>
}
