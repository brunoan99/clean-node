import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string) {
    this.client = await MongoClient.connect(global.__MONGO_URI__)
  },

  async disconnect () {
    this.client.close()
  }
}
