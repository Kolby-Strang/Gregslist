import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { saveState } from "../utils/Store.js"

class HousesService {
    addHouse(houseData) {
        const houses = AppState.houses
        houses.push(new House(houseData))
        saveState('houses', houses)
    }

    removeHouse(houseId) {
        const houses = AppState.houses
        const houseIndex = houses.findIndex(house => house.id == houseId)
        if (houseIndex == -1) {
            throw new Error(`Could not find house with id: ${houseId}`)
        }

        houses.splice(houseIndex, 1)
        saveState('houses', houses)

    }
}

export const housesService = new HousesService()