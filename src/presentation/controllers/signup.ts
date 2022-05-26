import { Controller, EmailValidator } from '../protocols'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParameterError, InvalidParameterError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController implements Controller {
  emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParameterError(field))
        }
      }
      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
      const isEqualPassword = httpRequest.body.password === httpRequest.body.passwordConfirmation
      if (!isEqualPassword) {
        return badRequest(new InvalidParameterError('password'))
      }
      if (!isValidEmail) {
        return badRequest(new InvalidParameterError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
