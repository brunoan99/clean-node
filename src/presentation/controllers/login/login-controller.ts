import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from './login-controller-protocols'
import { badRequest, serverError, unhauthorized, ok } from '../../helpers/http/http-helper'
export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {
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
      const loginToken = await this.authentication.auth({ email, password })
      if (!loginToken) {
        return unhauthorized()
      }
      return ok(loginToken)
    } catch (error) {
      return serverError(error)
    }
  }
}
