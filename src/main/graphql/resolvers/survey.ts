import { adapterResolver } from '@/main/adapters'
import { makeLoadSurveysController } from '@/main/factories/controllers/survey/load-surveys-controller-factory'

export default {
  Query: {
    surveys: async (parent: any, args: any, context: any) => await adapterResolver(makeLoadSurveysController(), args, context)
  }
}
