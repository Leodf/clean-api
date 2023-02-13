import { DbLoadSurveyResult } from '@/application/usecases/survey-result/db-load-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/repository/survey-result-mongo-repository'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SurveyMongoRepository } from '@/infra/db/mongodb/repository/survey-mongo-repository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
