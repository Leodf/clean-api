export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-api',
  port: process.env.PORT || 5050,
  salt: parseInt(process.env.SALT) || 12,
  jwtSecret: process.env.JWT_SECRET || 'algo_secreto'
}
