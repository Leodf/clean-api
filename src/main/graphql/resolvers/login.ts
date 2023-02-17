import { adapterResolver } from '@/main/adapters'
import { makeLoginController } from '@/main/factories/controllers/login/login-controller-factory'

export default {
  Query: {
    login: async (parent: any, args: any) => await adapterResolver(makeLoginController(), args)
  }
}
