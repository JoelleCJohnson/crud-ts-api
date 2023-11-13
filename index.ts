import express from "express"
import cors from "cors";
import { MongoClient } from "mongodb"
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(cors())

const client = new MongoClient(process.env.MONGO_URI as string)
client.connect()

const db = client.db('')
const coll = db.collection('')


app.get('/', (req, res) => {
    res.send('here is my api info')
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`))