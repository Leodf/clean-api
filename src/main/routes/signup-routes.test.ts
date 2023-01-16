import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Deve retornar uma account no sucesso', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Leonardo',
        email: 'faver_i@hotmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
