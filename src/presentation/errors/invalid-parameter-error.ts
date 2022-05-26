export class InvalidParameterError extends Error {
  constructor (parameterName: string) {
    super(`Invalid Parameter: ${parameterName}`)
    this.name = 'InvalidParameterError'
  }
}
