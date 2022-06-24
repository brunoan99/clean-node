import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (value: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    expect(sut.validate({ any_data: 'any_value' })).toEqual(new Error())

    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(null)
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error('any'))
    expect(sut.validate({ any_data: 'any_value' })).toEqual(new Error('any'))
  })

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error('first'))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error('second'))
    expect(sut.validate({ any_data: 'any_value' })).toEqual(new Error('first'))
  })

  test('Shoudl return null if validation succeds', () => {
    const { sut } = makeSut()
    expect(sut.validate({ any_data: 'any_value' })).toBe(null)
  })
})
