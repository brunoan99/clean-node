import { MissingParameterError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParameterError(this.fieldName)
    }
    return null
  }
}
