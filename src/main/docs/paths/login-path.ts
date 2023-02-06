export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'API para autenticar usuário',
    requestBody: {
      description: 'Exemplo de requisição para autenticação de usuário',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
            }
          }
        }
      },
      400: {
        description: 'Bad Request'
      }
    }
  }
}
