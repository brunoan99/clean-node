import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: (null as MongoClient),

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  },

  getCollection (collectionName: string): Collection {
    return this.client.db().collection(collectionName)
  },

  async disconnect (): Promise<void> {
    this.client.close()
  }
}
