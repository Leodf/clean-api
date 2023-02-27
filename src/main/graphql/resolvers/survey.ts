import { adapterResolver } from '@/main/adapters'
import { makeLoadSurveysController } from '@/main/factories/controllers/survey/load-surveys-controller-factory'

export default {
  Query: {
    surveys: async () => await adapterResolver(makeLoadSurveysController())
  }
}
