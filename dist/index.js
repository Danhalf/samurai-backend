"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_json_1 = __importDefault(require("./users.json"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
app.get('/users', (req, res) => {
    res.send(users_json_1.default);
});
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users_json_1.default.find(user => user.id === Number(id));
    res.send(user);
});
app.get('/find', (req, res) => {
    const name = typeof req.query.name === 'string' ? req.query.name.toString().toLowerCase() : undefined;
    const filteredUsers = name ? users_json_1.default.filter(user => user.name.toLowerCase().includes(name)) : null;
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
