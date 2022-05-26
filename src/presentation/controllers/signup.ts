import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParameterError } from '../errors/missing-parameter-error'
import { badRequest } from '../helpers/http-helper'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParameterError } from '../errors/invalid-parameter-error'
export class SignUpController implements Controller {
  emailValidator: EmailValidator;

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParameterError(field))
      }
    }

    const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValidEmail) {
      return badRequest(new InvalidParameterError('email'))
    }

    return {
      statusCode: 0,
      body: ''
    }
  }
}
