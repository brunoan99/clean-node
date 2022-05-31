import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('Should return content type as json by default', async () => {
    app.get('/test_content_type', (request, response) => {
      response.send()
    })
    await request(app)
      .get('/test_content_type')
      .send()
      .expect('content-type', /json/)
  })
})
