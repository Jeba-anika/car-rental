import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { notFoundHandler } from './app/middlewares/notFoundHandler'
import router from './app/routes'
const app: Application = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello There! Welcome to our car rental service!')
})

app.use(globalErrorHandler)
app.use(notFoundHandler)

export default app
