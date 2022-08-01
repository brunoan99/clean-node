export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'a04bc681c7a0201032fa0aa6967c7c47b49f2ab83656adca97ab7d6fa85bedd9'
}
