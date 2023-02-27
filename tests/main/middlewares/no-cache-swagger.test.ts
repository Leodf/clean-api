import request from 'supertest'
import { noCacheSwagger } from '@/main/middlewares/no-cache-swagger'
import { Express } from 'express'
import { setupApp } from '@/main/config/app'

let app: Express

describe('NoCacheSwagger Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
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
