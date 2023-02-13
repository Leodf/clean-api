import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository
} from '@/application/protocols/db/account'
import { AddAccountParams } from '@/domain/usecases/account'
import { AccountModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    return MongoHelper.map({ insertedId, ...accountData })
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }
      ]
    })
    return account && MongoHelper.map(account)
  }
}
