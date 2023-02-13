import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const { insertedId } = await accountCollection.insertOne({
    name: 'Leonardo',
    email: 'faver_i@hotmail.com',
    password: '123'
  })
  const id = insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: new ObjectId(id)
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}
describe('Survey Result Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Deve retornar 403 ao salvar uma survey result sem accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
    test('Deve retornar 200 no save survey result com accessToken valido', async () => {
      const { insertedId } = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      const serveyId = insertedId.toHexString()
      const accessToken = await makeAccessToken()
      await request(app)
        .put(`/api/surveys/${serveyId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1'
        })
        .expect(200)
    })
  })
  describe('GET /surveys/:surveyId/results', () => {
    test('Deve retornar 403 ao carregar uma survey result sem accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403)
    })
    test('Deve retornar 200 no load survey result com accessToken valido', async () => {
      const { insertedId } = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      const surveyId = insertedId.toHexString()
      const accessToken = await makeAccessToken()
      await request(app)
        .get(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
