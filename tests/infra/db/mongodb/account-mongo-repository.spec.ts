import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { AccountMongoRepository } from '@/infra/db/mongodb/repository'
import { mockAddAccountParams } from '@/../tests/domain/mocks'
import { type Collection } from 'mongodb'

let accountCollection: Collection
describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    test('Deve retornar uma account no add com sucesso', async () => {
      const sut = makeSut()
      const isValid = await sut.add(mockAddAccountParams())
      expect(isValid).toBeTruthy()
    })
  })
  describe('loadByEmail()', () => {
    test('Deve retornar uma account no loadByEmail com sucesso', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(mockAddAccountParams())
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.password).toBe('any_password')
    })
    test('Deve retornar null se loadByEmail falhar', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })
  describe('updateAccessToken()', () => {
    test('Deve atualizar uma account accessToken no updateAccessToken com sucesso', async () => {
      const sut = makeSut()
      const { insertedId } = await accountCollection.insertOne(mockAddAccountParams())
      const accountDataBefore = await accountCollection.findOne({ _id: insertedId })
      const accountBefore = MongoHelper.map(accountDataBefore)
      expect(accountBefore.accessToken).toBeFalsy()
      await sut.updateAccessToken(insertedId.toHexString(), 'any_token')
      const accountDataAfter = await accountCollection.findOne({ _id: insertedId })
      const accountAfter = MongoHelper.map(accountDataAfter)
      expect(accountAfter).toBeTruthy()
      expect(accountAfter.accessToken).toBe('any_token')
    })
  })
  describe('loadByToken()', () => {
    test('Deve retornar uma account no loadByToken sem o role com sucesso', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })
    test('Deve retornar uma account no loadByToken com o role com sucesso', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })
    test('Deve retornar null no loadByToken com o role inv??lida', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeFalsy()
    })
    test('Deve retornar uma account no loadByToken se usuario for admin', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
    })
    test('Deve retornar null se loadByToken falhar', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeFalsy()
    })
  })
  describe('checkByEmail()', () => {
    test('Deve retornar true se o email for valido', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(mockAddAccountParams())
      const exists = await sut.checkByEmail('any_email@mail.com')
      expect(exists).toBeTruthy()
    })
    test('Deve retornar false se email nao existir', async () => {
      const sut = makeSut()
      const exists = await sut.checkByEmail('any_email@mail.com')
      expect(exists).toBeFalsy()
    })
  })
})
