import { type LogErrorRepository } from '@/application/protocols/db/log'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stackError: string): Promise<void> {
    const errorCollection = MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stackError,
      date: new Date()
    })
  }
}
