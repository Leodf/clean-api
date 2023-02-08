import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Api',
    description: 'Api do curso do Mango para realizar enquetes',
    version: '2.4.0',
    contact: {
      name: 'Leonardo de Faveri',
      email: 'faver_i@hotmail.com',
      url: 'https://www.linkedin.com/in/leonardo-de-faveri'
    },
    license: {
      name: 'MIT License',
      url: 'https://spdx.org/licenses/MIT.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Enquete',
    description: 'APIs relacionadas a Enquete'
  }],
  paths,
  schemas,
  components
}
