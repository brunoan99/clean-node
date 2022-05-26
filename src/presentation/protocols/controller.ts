import { EmailValidator } from './email-validator'
import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  emailValidator: EmailValidator

  handle: (httpRequest: HttpRequest) => HttpResponse
}
