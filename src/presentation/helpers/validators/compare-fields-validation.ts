import { InvalidParameterError } from '../../errors'
import { Validation } from './validation'

export class CompareFieldsValidation implements Validation {
  private readonly fieldName: string
  private readonly fieldToCompareName: string

  constructor (fieldName: string, fieldToCompareName: string) {
    this.fieldName = fieldName
    this.fieldToCompareName = fieldToCompareName
  }

  validate (input: string): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParameterError(this.fieldToCompareName)
    }
    return null
  }
}
