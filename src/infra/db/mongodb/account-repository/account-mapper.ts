import { AccountModel } from '../../../../domain/models/account'

export const accountMapFromMongoToModel = (account: any): AccountModel => {
  const { _id, name, email, password } = account
  return {
    id: _id.toHexString(),
    name,
    email,
    password
  }
}
