import express from "express"
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb"
import 'dotenv/config'
import bcrypt from 'bcrypt'

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


app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const foundUser = await users.findOne({ email: email })

    if (foundUser) {


        try {
            const dbPassword = foundUser.password
            const result = await bcrypt.compare(password, dbPassword)
            result &&
                res.send("You are logged in")
        } catch (error) {
            res.json("not authenticated")
        }

    }
    else{
        res.json("user not found")
    }
})

app.post('/', async (req, res) => {
    const { email, password } = req.body
    const hashPass = await bcrypt.hash(password, 10)
    const newUser = await users.insertOne({ email: email, password: hashPass })
    res.status(201).send("User added")
})

app.delete('/:_id', async (req, res) => {
    const cleanId = new ObjectId(req.params._id)
    const deleteUser = await users.findOneAndDelete({ _id: cleanId })
    res.send(deleteUser)
})

app.patch('/:_id', async (req, res) => {
    const cleanId = new ObjectId(req.params._id)
    const updatedUser = await users.findOneAndUpdate({ _id: cleanId }, { $set: req.body })
    res.send(updatedUser)
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`))