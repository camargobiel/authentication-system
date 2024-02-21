import express from 'express'
import * as routes from './presentation/routes'
import './passport'

const app = express()

app.use(express.json())

app.use('/v1', [...Object.values(routes)])

export default app
