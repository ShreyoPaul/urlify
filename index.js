import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import groqRouter from './routes/groqRoutes.js'
import urlshortnerRouter from './routes/shorturlRoutes.js'
import authRouter from './routes/authRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/describe', groqRouter);
app.use('/url', urlshortnerRouter);
app.use('/auth', authRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(8000, async () => {
    console.log('Server is running on 8000')
})