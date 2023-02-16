import { DbLoadAnswersBySurvey } from '@/application/usecases/survey/db-load-answers-by-survey'
import { LoadAnswersBySurvey } from '@/domain/usecases/survey/load-answers-by-survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/repository/survey-mongo-repository'

export const makeDbLoadSurveyById = (): LoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadAnswersBySurvey(surveyMongoRepository)
}
