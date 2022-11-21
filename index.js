import  express  from "express";
import cors from 'cors';
import usersRoutes from'./src/routes/users.routes.js'
import recordRoutes from './src/routes/records.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use(usersRoutes)
app.use(recordRoutes)


app.listen(5000,() => console.log('Server running in port:5000') )