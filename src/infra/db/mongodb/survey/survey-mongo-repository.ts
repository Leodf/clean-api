import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyModel } from '@/domain/usecases/add-survey'
import { AddSurveyRepository } from '@/application/protocols/db/survey/add-survey-repository'
import { LoadSurveysRepository } from '@/application/protocols/db/survey/load-surveys-repository'
import { LoadSurveyByIdRepository } from '@/application/protocols/db/survey/load-survey-by-id-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    const surveysData = await surveyCollection.find().toArray()
    const surveys = MongoHelper.mapCollection(surveysData) as SurveyModel[]
    return surveys
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    const surveyData = await surveyCollection.findOne({ _id: new ObjectId(id) })
    const survey = MongoHelper.map(surveyData) as SurveyModel
    return survey
  }
}
