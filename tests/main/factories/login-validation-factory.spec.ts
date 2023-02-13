
import { makeLoginValidation } from '@/main/factories/controllers/login/login-validation-factory'
import { EmailValidation, ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { mockEmailValidator } from '@/../tests/validation/mocks'

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
