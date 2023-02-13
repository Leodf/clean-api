
import { EmailValidation, ValidationComposite, RequiredFieldValidation, CompareFieldsValidation } from '@/validation/validators'
import { makeSignUpValidation } from '@/main/factories/controllers/signup/signup-validation-factory'
import { Validation } from '@/presentation/protocols'
import { mockEmailValidator } from '@/../tests/validation/mocks'

jest.mock('@/validation/validators/validation-composite')
describe('SignUpValidation Factory', () => {
  test('Deve chamar ValidationComposite com todas as validações', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', mockEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
