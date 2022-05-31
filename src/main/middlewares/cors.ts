import { Request, Response, NextFunction } from 'express'

export const cors = (request: Request, response: Response, next: NextFunction): void => {
  response.set('access-control-allow-headers', '*')
  response.set('access-control-allow-methods', '*')
  response.set('access-control-allow-origin', '*')
  next()
}
