import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { setupApp } from '@/main/config/app'

import { Express } from 'express'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'

let accountCollection: Collection
let surveyCollection: Collection
let app: Express

const makeAccessToken = async (): Promise<string> => {
  const { insertedId } = await accountCollection.insertOne({
    name: 'Leonardo',
    email: 'faver_i@hotmail.com',
    password: '123',
    role: 'admin'
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

describe('Survey Result GraphQl', () => {
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
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })
  describe('Surveys Query', () => {
    test('Deve retornar uma SurveyResult com credenciais validas', async () => {
      const now = new Date()
      const surveyResult = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com'
          },
          {
            answer: 'Answer 2'
          }
        ],
        date: now
      })
      const query = `query {
        loadSurveyResult (surveyId: "${surveyResult.insertedId.toHexString()}") {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }`
      const accessToken = await makeAccessToken()
      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.loadSurveyResult.question).toBe('Question')
      expect(res.body.data.loadSurveyResult.date).toBe(now.toISOString())
      expect(res.body.data.loadSurveyResult.answers).toEqual([{
        answer: 'Answer 1',
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      }, {
        answer: 'Answer 2',
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      }])
    })
  })
})
