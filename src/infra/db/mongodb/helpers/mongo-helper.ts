import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: (null as MongoClient),

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },

  getCollection (collectionName: string): Collection {
    return this.client.db().collection(collectionName)
  },

  async disconnect (): Promise<void> {
    this.client.close()
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id.toHexString() })
  }
}
