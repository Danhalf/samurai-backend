"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_json_1 = __importDefault(require("./users.json"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const middlewareParser = (0, body_parser_1.default)();
app.use(middlewareParser);
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
let users = [...users_json_1.default];
app.get('/users', (req, res) => {
    res.send(users);
});
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === Number(id));
    res.send(user);
});
app.post('/users', (req, res) => {
    const { name, email, gender, country } = req.body;
    const id = new Date().getTime().toString(2);
    const newUser = {
        id,
        name,
        email,
        gender,
        country
    };
    users = [...users, newUser];
    res.status(201).send(newUser);
});
app.put('/users/:id', (req, res) => {
    const { name, email, gender, country } = req.body;
    const { id } = req.params;
    let user = users.find(u => u.id === Number(id));
    if (user) {
        user.name = name;
        user.gender = gender;
        user.email = email;
        user.country = country;
        res.send(user);
    }
    else {
        res.send(404);
    }
});
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const prevLenght = users.length;
    users = users.filter(user => user.id !== Number(id));
    if (prevLenght > users.length) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
app.get('/find', (req, res) => {
    const name = typeof req.query.name === 'string' ? req.query.name.toString().toLowerCase() : undefined;
    const filteredUsers = name ? users.filter(user => user.name.toLowerCase().includes(name)) : null;
    if (filteredUsers === null || filteredUsers === void 0 ? void 0 : filteredUsers.length) {
        res.send(filteredUsers);
    }
    else {
        res.send(404);
    }
});
app.listen(PORT, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
