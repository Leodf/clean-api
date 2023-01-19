import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { hash } from 'bcrypt'

let accountCollection: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Deve retornar 200 no signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Leonardo',
          email: 'faver_i@hotmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })
  describe('POST /login', () => {
    test('Deve retornar 200 no login', async () => {
      const password = await hash('123456', 12)
      await accountCollection.insertOne({
        name: 'Leonardo',
        email: 'faver_i@hotmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'faver_i@hotmail.com',
          password: '123456'
        })
        .expect(200)
    })
  })
})
