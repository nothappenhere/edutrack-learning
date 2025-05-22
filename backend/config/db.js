import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Client } = pkg

const client = new Client({
  host: process.env.POSTGRE_HOST, // Endpoint Amazon RDS
  port: process.env.POSTGRE_PORT, // Port PostgreSQL
  user: process.env.POSTGRE_USER, // Username PostgreSQL
  password: process.env.POSTGRE_PASSWORD, // Password PostgreSQL
  database: process.env.POSTGRE_DATABASE, // Nama database yang ingin digunakan
  // ssl: { rejectUnauthorized: false }, // Menambahkan SSL
})

client
  .connect()
  .then(() => console.log('Connected to PostgreSQL!'))
  .catch((err) => console.error('PostgreSQL connection error:', err.stack))

export default client
