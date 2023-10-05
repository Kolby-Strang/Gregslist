import { AppState } from "../AppState.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class HousesController {
    constructor() {
        console.log('Houses Controller loads');
        _drawHouses()
        AppState.on('houses', _drawHouses)
    }

    async addHouse(event) {
        event.preventDefault()
        const wantsToSubmit = await Pop.confirm('Are you sure you want to submit?')
        if (wantsToSubmit) {
            bootstrap.Modal.getInstance(document.getElementById('formModal')).hide()

            const newHouseData = getFormData(event.target)

            newHouseData.hasHoa = newHouseData.hasHoa == "on"
            newHouseData.isRental = newHouseData.isRental == 'on'

            housesService.addHouse(newHouseData)
            event.target.reset()
            Pop.success('House Listed!!!')
            _drawHouses()

        } else {
            Pop.toast('Form not submitted', 'info')
        }

    }

    async removeHouse(houseId) {
        const wantsToRemove = await Pop.confirm('Are you sure you want to delete?')
        if (wantsToRemove) {
            housesService.removeHouse(houseId)
            Pop.success('House Removed')
            _drawHouses()
        } else {
            Pop.toast('Canceled', 'info')
        }
    }

}

function _drawHouses() {
    const houses = AppState.houses
    let content = ''
    houses.forEach(house => content += house.card)
    setHTML('houses-dump', content)
}