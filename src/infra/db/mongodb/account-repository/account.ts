import { AddAccountRepository } from '../../../../application/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    const accountMongo = await accountCollection.findOne(insertedId)
    const { _id, name, email, password } = accountMongo
    const account = { id: _id.toHexString(), name, email, password }
    return account
  }
}
