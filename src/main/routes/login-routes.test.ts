import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

describe('Login Routes', () => {
  let accountCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'bruno',
          email: 'bruno@gmail.com',
          password: '1234',
          passwordConfirmation: '1234'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login success', async () => {
      const password = await hash('1234', 12)
      await accountCollection.insertOne({
        name: 'bruno',
        email: 'bruno@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'bruno@gmail.com',
          password: '1234'
        })
        .expect(200)
    })

    test('Should return 401 on login fails', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'bruno@gmail.com',
          password: '1234'
        })
        .expect(401)
    })
  })
})
