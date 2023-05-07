import express, {Request, Response} from "express"
const app = express()
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST

app.get('/', (req: Request, res: Response) => {
    let testMessage = `Running on http://${HOST}:${PORT}`;
    res.send(testMessage)
})

app.listen(PORT, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
})