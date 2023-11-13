"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
require("dotenv/config");
const client = new mongodb_1.MongoClient(process.env.MONGO_URI);
const db = client.db('dinos');
const users = db.collection('users');
client.connect();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield users.find({}).toArray();
    res.send('here is my api info');
}));
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield users.insertOne(req.body);
    res.status(201).send("User added");
}));
app.delete('/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cleanId = new mongodb_1.ObjectId(req.params._id);
    const deleteUser = yield users.findOneAndDelete({ _id: cleanId });
    res.send(deleteUser);
}));
app.patch('/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cleanId = new mongodb_1.ObjectId(req.params._id);
    const updatedUser = yield users.findOneAndUpdate({ _id: cleanId }, { $set: req.body });
    res.send(updatedUser);
}));
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));
