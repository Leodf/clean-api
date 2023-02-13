import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators'

describe('RequiredField Validation', () => {
  test('Deve retornar o MissingParamError se o validation falhar', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Não Deve retornar se validation der certo', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
