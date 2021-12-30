require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  isProduction: process.env.NODE_ENV === 'production',
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
}

module.exports = config;