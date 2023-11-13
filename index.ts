import express from "express"
import cors from "cors";
import { MongoClient } from "mongodb"
import 'dotenv/config'

const client = new MongoClient(process.env.MONGO_URI as string)
const db = client.db('dinos')
const users = db.collection('users')

client.connect()


const app = express()

app.use(express.json())
app.use(cors())


app.get('/', async (req, res) => {
    const allUsers = await users.find({}).toArray()
    res.send('here is my api info')
})

app.post('/', async (req, res) => {
    const newUser = await users.insertOne(req.body)
    res.status(201).send("User added")
})

app.delete('/:email', async (req, res) => {
    const deleteUser = await users.findOneAndDelete({ email: req.params.email })
    res.send(deleteUser)
})

app.patch('/:email', async (req, res) => {
    const updatedUser = await users.findOneAndUpdate({email: req.params.email}, {$set: req.body})
    res.send(updatedUser)
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`))