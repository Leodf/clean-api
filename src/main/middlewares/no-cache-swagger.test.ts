import request from 'supertest'
import { noCacheSwagger } from './no-cache-swagger'
import app from '@/main/config/app'

describe('NoCacheSwagger Middleware', () => {
  test('Deve desabilitar o cache', async () => {
    app.get('/test_no_cache', noCacheSwagger, (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
