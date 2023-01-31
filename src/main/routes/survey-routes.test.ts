import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection
describe('Login Routes', () => {
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

  describe('POST /surveys', () => {
    test('Deve retornar 403 ao add survey sem accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        })
        .expect(403)
    })
    test('Deve retornar 204 ao add survey com accessToken valido', async () => {
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
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        })
        .expect(204)
    })
  })
  describe('GET /surveys', () => {
    test('Deve retornar 403 ao carregar as surveys sem accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })
    test('Deve retornar 200 ao carregar as surveys com accessToken valido', async () => {
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
      await surveyCollection.insertMany([{
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          }
        ],
        date: new Date()
      }, {
        question: 'other_question',
        answers: [
          {
            image: 'other_image',
            answer: 'other_answer'
          }
        ],
        date: new Date()
      }])
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
