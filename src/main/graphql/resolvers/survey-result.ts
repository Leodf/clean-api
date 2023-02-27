import { adapterResolver } from '@/main/adapters'
import { makeLoadSurveyResultController } from '@/main/factories/controllers/survey-result/load-survey-result-controller-factory'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result-controller-factory'

export default {
  Query: {
    loadSurveyResult: async (parent: any, args: any) => await adapterResolver(makeLoadSurveyResultController(), args)
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any) => await adapterResolver(makeSaveSurveyResultController(), args)
  }

}
