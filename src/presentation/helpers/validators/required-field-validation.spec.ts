import { RequiredFieldValidation } from './required-field-validation'
import { MissingParameterError } from '../../errors'

const makeSut = (field: string): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParameterError if validation fails', () => {
    const sut = makeSut('any_field')
    expect(sut.validate({})).toEqual(new MissingParameterError('any_field'))
  })

  test('Should return null if validation succeds', () => {
    const sut = makeSut('any_field')
    expect(sut.validate({ any_field: 'any_value' })).toBe(null)
  })
})
