
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { makeAddSurveyValidation } from '@/main/factories/controllers/survey/add-survey-validation-factory'

jest.mock('@/validation/validators/validation-composite')
describe('AddSurveyValidation Factory', () => {
  test('Deve chamar ValidationComposite com todas as validações', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
