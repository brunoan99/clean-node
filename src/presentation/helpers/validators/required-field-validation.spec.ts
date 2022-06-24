import { RequiredFieldValidation } from './required-field-validation'
import { MissingParameterError } from '../../errors'

describe('RequiredField Validation', () => {
  test('Should return a MissingParameterError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field')
    expect(sut.validate({})).toEqual(new MissingParameterError('any_field'))
  })
})
