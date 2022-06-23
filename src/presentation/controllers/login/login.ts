import { Controller, HttpRequest, HttpResponse, Authentication, EmailValidator } from './login-protocols'
import { InvalidParameterError, MissingParameterError } from '../../errors'
import { badRequest, serverError, unhauthorized, ok } from '../../helpers/http-helper'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParameterError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValidEmail) {
        return badRequest(new InvalidParameterError('email'))
      }
      const loginToken = await this.authentication.auth(email, password)
      if (!loginToken) {
        return unhauthorized()
      }
      return ok(loginToken)
    } catch (error) {
      return serverError(error)
    }
  }
}
