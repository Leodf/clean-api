import { DbLoadSurveyById } from '@/application/usecases/survey/db-load-survey-by-id'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
