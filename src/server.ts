import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import productRouter from './routes/products'
import userRouter from './routes/users'
import orderRoutes from './routes/orders'
import cookieParser from 'cookie-parser'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"



const corsOptions = {
    origin: "localhost:4200",
    optionsSuccessStatus: 200
}


app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())



app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

productRouter(app)
userRouter(app)
orderRoutes(app)


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app