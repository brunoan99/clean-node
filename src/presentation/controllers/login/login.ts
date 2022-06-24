import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from './login-protocols'
import { badRequest, serverError, unhauthorized, ok } from '../../helpers/http-helper'
export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validation: Validation

  constructor (validation: Validation, authentication: Authentication) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
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
