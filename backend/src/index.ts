import express from "express"
import cors from "cors"
import { faker } from "@faker-js/faker"

/// HELPERS

interface Decibels {
    center: number
    left: number
    right: number
    surroundLeft: number
    surroundRight: number
}

//silence
const min = 0
// too loud noise
const max = 120

const getDecibels = (): Decibels => ({
    center: faker.number.int({ min, max }),
    left: faker.number.int({ min, max }),
    right: faker.number.int({ min, max }),
    surroundLeft: faker.number.int({ min, max }),
    surroundRight: faker.number.int({ min, max }),
})

/// SERVER

const app = express()

const corsOptions = {
    origin: "http://localhost:8081",
}

app.use(cors(corsOptions))

app.use(express.json())
const port = process.env.PORT || 5000

app.get("/", (_req, res) => {
    res.send(getDecibels())
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// (parameter) response: http.ServerResponse<http.IncomingMessage> & {
//     req: http.IncomingMessage;
// }
