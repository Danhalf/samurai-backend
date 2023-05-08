import express, {Request, Response} from "express"
import usersDB from "./users.json"
import bodyParser from "body-parser"

const app = express()

const middlewareParser = bodyParser();

app.use(middlewareParser);

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST

interface IUser {
    "id": number | string,
    "name": string,
    "gender": string,
    "country": string,
    "email": string
}

let users: IUser[] = [...usersDB];

app.get('/users', (req: Request, res: Response) => {
    res.send(users)
})

app.get('/users/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    const user = users.find(user => user.id === Number(id))
    res.send(user)
})

app.post('/users', (req: Request, res: Response) => {
    const {name, email, gender, country}: IUser = req.body;
    const id = new Date().getTime().toString(2);
    const newUser = {
        id,
        name,
        email,
        gender,
        country
    }
    users = [...users, newUser]
    res.status(201).send(newUser);
})

app.put('/users/:id', (req: Request, res: Response) => {
    const {name, email, gender, country}: IUser = req.body;
    const {id} = req.params;

    let user = users.find(u=>u.id === Number(id));

    if (user) {
        user.name = name
        user.gender = gender
        user.email = email
        user.country = country
        res.send(user);
    } else {
        res.send(404)
    }
})

app.delete('/users/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    const prevLenght = users.length;
    users = users.filter(user => user.id !== Number(id))
    if (prevLenght > users.length) {
        res.send(204)
    } else {
        res.send(404)
    }
})

app.get('/find', (req: Request, res: Response) => {
    const name: string | undefined = typeof req.query.name === 'string' ? req.query.name.toString().toLowerCase() : undefined;
    const filteredUsers = name ? users.filter(user => user.name.toLowerCase().includes(name)) : null;
    if (filteredUsers?.length) {
        res.send(filteredUsers)
    } else {
        res.send(404)
    }
})

app.listen(PORT, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
})