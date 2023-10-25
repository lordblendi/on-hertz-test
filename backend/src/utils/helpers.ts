import { faker } from "@faker-js/faker"

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

export const getDecibels = (): Decibels => ({
    center: faker.number.int({ min, max }),
    left: faker.number.int({ min, max }),
    right: faker.number.int({ min, max }),
    surroundLeft: faker.number.int({ min, max }),
    surroundRight: faker.number.int({ min, max }),
})
