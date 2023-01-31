import { AddSurveyRepository } from '../../../../application/protocols/db/survey/add-survey-repository'
import { LoadSurveysRepository } from '../../../../application/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '../../../../domain/models/survey'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    const surveysData = await surveyCollection.find().toArray()
    const surveys = MongoHelper.mapCollection(surveysData)
    return surveys
  }
}
