import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
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

  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const accounData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const account = await sut.add(accounData)
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(accounData.name)
    expect(account.email).toBe(accounData.email)
    expect(account.password).toBe(accounData.password)
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    const accounData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await accountCollection.insertOne(accounData)
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(accounData.name)
    expect(account.email).toBe(accounData.email)
    expect(account.password).toBe(accounData.password)
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()
    const accounData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const { insertedId } = await accountCollection.insertOne(accounData)
    const accountPreUpdate = await accountCollection.findOne({ _id: insertedId })
    expect(accountPreUpdate.accessToken).toBeFalsy()
    await sut.updateAccessToken(insertedId.toHexString(), 'any_token')
    const accountPosUpdate = await accountCollection.findOne({ _id: insertedId })
    expect(accountPosUpdate).toBeTruthy()
    expect(accountPosUpdate.accessToken).toBe('any_token')
  })
})
