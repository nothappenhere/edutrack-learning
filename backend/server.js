import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// import helmet from 'helmet'
// import morgan from 'morgan'

import auth from './routes/auth.js'
import materials from './routes/materials.js'
import quizzes from './routes/quizzes.js'
import errorHandler from './middlewares/errorHandler.js'
import notFound from './middlewares/notFound.js'

dotenv.config()
const app = express()

//* Middleware global
app.use(cors())
// app.use(helmet())
app.use(express.json()) // Parse JSON body
app.use(express.urlencoded({ extended: false }))
// app.use(morgan('dev')) // Log HTTP requests

//* Routes
app.use('/api', auth, materials, quizzes)

//* Error Handling
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
