import express from "express"
import cors from "cors"
import { db } from "mongodb"

const db = db.collection('')
const PORT = 8080

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {

})
app.post('/', (req, res) => {
    
})
app.patch('/', (req, res) => {
    
})
app.delete('/', (req, res) => {
    
})

app.listen(PORT, `Listening on port ${PORT}...`)
