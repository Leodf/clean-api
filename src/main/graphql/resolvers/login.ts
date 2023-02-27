import { adapterResolver } from '@/main/adapters'
import { makeLoginController } from '@/main/factories/controllers/login/login-controller-factory'
import { makeSignUpController } from '@/main/factories/controllers/signup/signup-controller-factory'

export default {
  Query: {
    login: async (parent: any, args: any) => await adapterResolver(makeLoginController(), args)
  },

  Mutation: {
    signup: async (parent: any, args: any) => await adapterResolver(makeSignUpController(), args)
  }
}
