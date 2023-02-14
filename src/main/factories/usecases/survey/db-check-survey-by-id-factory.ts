import { DbCheckSurveyById } from '@/application/usecases/survey'
import { CheckSurveyById } from '@/domain/usecases/survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/repository'

export const makeDbCheckSurveyById = (): CheckSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbCheckSurveyById(surveyMongoRepository)
}
