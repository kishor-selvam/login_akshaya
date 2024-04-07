import express from 'express';
import cors from 'cors';
import AuthRoutes from './app/route/auth.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth", AuthRoutes)

const PORT = 5001;
app.listen(PORT, () => {
    console.log("Server on Running Port :", PORT)
})