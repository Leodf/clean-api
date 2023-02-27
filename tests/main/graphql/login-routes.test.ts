import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Express } from 'express'
import { setupApp } from '@/main/config/app'
import { hash } from 'bcrypt'
import request from 'supertest'

let accountCollection: Collection
let app: Express

describe('Login GraphQl', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('Login Query', () => {
    const query = `query {
      login (email: "faver_i@hotmail.com", password: "123456") {
        accessToken
        name
      }
    }`
    test('Deve retornar um account com credenciais validas', async () => {
      const password = await hash('123456', 12)
      await accountCollection.insertOne({
        name: 'Leonardo',
        email: 'faver_i@hotmail.com',
        password
      })
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.login.accessToken).toBeTruthy()
      expect(res.body.data.login.name).toBe('Leonardo')
    })
    test('Deve retornar UnauthorizedError com credenciais invalidas', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(401)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Unauthorize')
    })
  })
})
