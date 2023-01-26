import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import productRouter from './routes/productsRoutes'
import userRouter from './routes/usersRoutes'
import orderRoutes from './routes/orderRoutes'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())


const corsOptions = {
    origin: "localhost:4200",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))



app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

productRouter(app)
userRouter(app)
orderRoutes(app)


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
