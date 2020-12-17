const express = require('express')

const server = express()

server.use(express.json())

const Cars = require('./cars/cars-model')

server.post('/cars', async (req, res) => {
    const newCar = await Cars.add(req.body)
    res
        .status(200)
        .json(newCar)
})

server.delete('/cars/:id', async (req, res) => {
    await Cars.delete(req.params.id)
    res
        .status(200)
        .json({message: 'Car deleted.'})
})

module.exports = server