import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (value: any): Error {
        return new Error()
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    expect(sut.validate({ any_data: 'any_value' })).toEqual(new Error())
  })
})
