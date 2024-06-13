import cors from 'cors'
import express, { Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import router from './app/routes'
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello There! Welcome to our car rental service!')
})

app.use(globalErrorHandler)

export default app
