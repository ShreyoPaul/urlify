require("dotenv").config()
const express = require('express');
const cors = require('cors');
const groqRouter = require('./routes/groqRoutes');
const urlshortnerRouter = require('./routes/shorturlRoutes');
const authRouter = require('./routes/authRoutes');

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

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(8000, async () => {
    console.log('Server is running on 8000')
})