// 1. Import our tools
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import staffRoutes from './routes/staffRoutes.js'
import attendanceRoutes from './routes/attendanceRoutes.js'
import authRoutes  from './routes/authRoutes.js'

// 2. Load our .env secret file
dotenv.config()

// 3. Create the express app
const app = express()

// 4. Middlewares
app.use(cors())
app.use(express.json())

// ROUTES

app.use('/api/staffs', staffRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/auth/', authRoutes)

// 6. Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected!')
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log('Connection failed!', error)
    })