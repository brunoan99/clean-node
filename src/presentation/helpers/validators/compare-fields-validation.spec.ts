import { InvalidParameterError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (field: string, fieldToComapre: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToComapre)
}

describe('CompareFields Validation', () => {
  test('Should return a MissingParameterError if validation fails', () => {
    const sut = makeSut('any_field', 'any_other_field')
    expect(sut.validate({ any_field: 'any_value', any_other_field: 'any_other_value' })).toEqual(new InvalidParameterError('any_other_field'))
  })

  test('Should return null if validation succeds', () => {
    const sut = makeSut('any_field', 'any_other_field')
    expect(sut.validate({ any_field: 'any_same_value', any_other_field: 'any_same_value' })).toBe(null)
  })
})
