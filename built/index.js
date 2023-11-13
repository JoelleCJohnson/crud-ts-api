"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const client = new mongodb_1.MongoClient(process.env.MONGO_URI);
const db = client.db('');
const coll = db.collection('');
app.get('/', (req, res) => {
    res.send('here is my api info');
});
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));
