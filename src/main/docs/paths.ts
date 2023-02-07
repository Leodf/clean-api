import {
  loginPath,
  signPath,
  surveyPath,
  surveyResultPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': surveyResultPath
}
