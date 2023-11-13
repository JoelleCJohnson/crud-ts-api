import express from "express"
import cors from "cors";

const PORT: number = 8080
const app = express()

app.use(express.json())
app.use(cors())

app.listen(PORT, `Listening on port ${PORT}...`)