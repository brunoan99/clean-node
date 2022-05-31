import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('Should enable cors', async () => {
    app.get('/test_cors', (request, response) => {
      response.send()
    })
    await request(app)
      .get('/test_cors')
      .send()
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-origin', '*')
  })
})
