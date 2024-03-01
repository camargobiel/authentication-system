import express from 'express'
import * as routes from './presentation/routes'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './docs/swagger_output.json'

const app = express()

app.use(express.json())

app.use('/v1', [...Object.values(routes)])
app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

export default app
