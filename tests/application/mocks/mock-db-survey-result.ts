import { SaveSurveyResultRepository, LoadSurveyResultRepository } from '@/application/protocols/db/survey-result'
import { SaveSurveyResult } from '@/domain/usecases/survey-result'
import { SurveyResultModel } from '@/domain/models'
import { mockSurveyResultModel } from '../../domain/mocks'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResult.Params): Promise<void> {
      await Promise.resolve()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultRepositoryStub()
}
