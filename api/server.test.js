const db = require('../data/dbConfig')
const server = require('./server')
const request = require('supertest')

const prius = { make: 'toyota', model: 'prius'}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  beforeEach(async () => {
    await db('cars').truncate()
  })
  afterAll(async () => {
    await db.destroy()
  })

describe('Endpoints', () => {
    describe('[POST] /cars', () => {
        it('returns with status 200', async () => {
            const response = await request(server).post('/cars').send(prius)
            expect(response.status).toBe(200)
        })
        it('returns with the newly created car', async () => {
            const response = await request(server).post('/cars').send(prius)
            expect(response.body).toMatchObject(prius)
        })
    })
    describe('[DELETE] /cars/:id', async () => {
        it('returns with status 200', async () => {
            await db('cars').insert(prius)
            const response = await request(server).delete('/cars/1')
            expect(response.status).toBe(200)
        })
        it('has deleted the car from the db', async () => {
            await db('cars').insert(prius)
            await request(server).delete('/cars/1')
            const car = await db('cars').where('id', 1)
            expect(car).toHaveLength(0)
        })
    })
})