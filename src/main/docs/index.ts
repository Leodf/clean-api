import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Api',
    description: 'Api do curso do Mango para realizar enquetes',
    version: '2.2.0'
  },
  license: {
    name: 'MIT License',
    url: 'https://spdx.org/licenses/MIT.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Enquete'
  }],
  paths,
  schemas,
  components
}
