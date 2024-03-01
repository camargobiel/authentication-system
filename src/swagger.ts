import swaggerAutogen from 'swagger-autogen'

const outputFile = './docs/swagger_output.json'
const endpointsFiles = [
  './presentation/routes/accounts.routes.ts',
  './presentation/routes/authentication.routes.ts',
  './presentation/routes/products.routes.ts'
]

swaggerAutogen(outputFile, endpointsFiles)
