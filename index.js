import  express  from "express";
import cors from 'cors';
import usersRoutes from'./src/routes/users.routes.js'
import recordRoutes from './src/routes/records.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use(usersRoutes)
app.use(recordRoutes)

const port = process.env.PORT || 5000
app.listen(port,() => console.log(`Server running in port:${port}`) )