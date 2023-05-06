import express, {Request, Response} from "express"
const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
    let testMessage = "Current message"
    res.send(testMessage)
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})