import request from 'supertest'
import app from '@/main/config/app'

describe('Body Parser Middleware', () => {
  test('Deve analisar o body como json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Leonardo' })
      .expect({ name: 'Leonardo' })
  })
})
