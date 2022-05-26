import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParameterError } from '../errors/missing-parameter-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParameterError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParameterError('email'))
    }
    return {
      statusCode: 0,
      body: ''
    }
  }
}
