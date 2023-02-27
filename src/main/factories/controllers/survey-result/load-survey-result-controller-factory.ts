import { LoadSurveyResultController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbCheckSurveyById } from '@/main/factories/usecases/survey'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/survey-result'

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyResultController = new LoadSurveyResultController(makeDbCheckSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(loadSurveyResultController)
}
