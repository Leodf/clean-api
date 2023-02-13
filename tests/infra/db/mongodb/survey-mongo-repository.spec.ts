import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { SurveyMongoRepository } from '@/infra/db/mongodb/repository'
import { AccountModel, SurveyModel } from '@/domain/models'
import MockDate from 'mockdate'
import { mockSurvey } from '@/../tests/domain/mocks'
import { Collection, ObjectId } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

const mockAccount = async (): Promise<AccountModel> => {
  const { insertedId } = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  })
  const accountData = await accountCollection.findOne({ _id: insertedId })
  const account = MongoHelper.map(accountData) as AccountModel
  return account
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe(('add()'), () => {
    test('Deve adicionar uma survey no sucesso', async () => {
      const sut = makeSut()
      await sut.add({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          },
          {
            answer: 'other_answer'
          }
        ],
        date: new Date()
      })
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })
  describe(('loadAll()'), () => {
    test('Deve carregar todas surveys no sucesso', async () => {
      const account = await mockAccount()
      const { insertedIds } = await surveyCollection.insertMany([mockSurvey(), mockSurvey()])
      const surveyData = await surveyCollection.findOne({ _id: insertedIds[0] })
      const survey = MongoHelper.map(surveyData) as SurveyModel
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      const surveys = await sut.loadAll(account.id)
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe(survey.question)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].question).toBe(survey.question)
      expect(surveys[1].didAnswer).toBe(false)
    })
    test('Deve carregar uma lista vazia', async () => {
      const account = await mockAccount()
      const sut = makeSut()
      const surveys = await sut.loadAll(account.id)
      expect(surveys.length).toBe(0)
    })
  })
  describe(('loadById()'), () => {
    test('Deve carregar uma survey por id no sucesso', async () => {
      const { insertedId } = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          }
        ],
        date: new Date()
      })
      const id = insertedId.toHexString()
      const sut = makeSut()
      const survey = await sut.loadById(id)
      expect(survey).toBeTruthy()
    })
  })
})
