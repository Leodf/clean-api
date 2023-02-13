import { AddSurvey } from '@/domain/usecases/survey/add-survey'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurvey.Params): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddSurveyStub()
}
