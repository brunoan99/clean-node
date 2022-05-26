import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParameterError } from '../errors/missing-parameter-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParameterError(field))
      }
    }
    return {
      statusCode: 0,
      body: ''
    }
  }
}
