
import { makeLoginValidation } from './login-validation-factory'
import { EmailValidation, ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { mockEmailValidator } from '@/validation/tests'

jest.mock('@/validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Deve chamar ValidationComposite com todas as validações', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', mockEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
