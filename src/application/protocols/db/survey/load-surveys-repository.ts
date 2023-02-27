import { type LoadSurveys } from '@/domain/usecases/survey'

export interface LoadSurveysRepository {
  loadAll: (accountId: string) => Promise<LoadSurveysRepository.Result>
}

export namespace LoadSurveysRepository {
  export type Result = LoadSurveys.Result
}
