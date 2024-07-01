require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./connection/db')
const router = require('./Router/router')

const cartServer = express()
cartServer.use(cors())
cartServer.use(express.json())
cartServer.use(router)


const PORT = 3000 || process.env.PORT

cartServer.listen(PORT, ()=> {
    console.log(`Cart Server Started at Port: ${PORT}`)
})

// cartServer.get('/', (req, res) => {
//     res.send(`<h1>Cart Server Started. Waiting for Client Request</h1>`)
// })