import {
  loginPath,
  signPath,
  surveyPath,
  surveyResultPath
} from '@/main/docs/paths/'

export default {
  '/login': loginPath,
  '/signup': signPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': surveyResultPath
}
