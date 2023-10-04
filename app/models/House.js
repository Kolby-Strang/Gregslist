import { generateId } from "../utils/GenerateId.js"

export class House {
    /**
 * @param {{ title, hasHoa, rooms, bathRooms, floors, isRental, price, yearBuilt, timeListed }} data
 */
    constructor(data) {
        this.title = data.title
        this.hasHoa = data.hasHoa
        this.bedrooms = data.bedrooms
        this.bathRooms = data.bathRooms
        this.floors = data.floors
        this.isRental = data.isRental
        this.price = data.price
        this.yearBuilt = data.yearBuilt
        this.imgUrl = data.imgUrl
        this.timeListed = (data.timeListed ? new Date(data.timeListed) : new Date())
        this.id = generateId()
    }

    get card() {
        return `
        <div class="col-12 col-md-6 col-xl-4 mb-2">
            <div class="card d-flex position-relative">
                <img class="house-img" src="${this.imgUrl}">
                <div class="px-3 pb-3">
                    <p class="fs-5">${this.title}, ${this.yearBuilt}</p>
                    <p>$${this.price}</p>
                    <div class="d-flex">
                        <p class="text-secondary">${this.hasHoa ? 'HOA ' : ''}${this.isRental ? 'Rental' : ''}</p>
                    </div>
                    <p>${this.bedrooms} bedrooms, ${this.floors} floors, ${this.bathRooms} bathrooms</p>
                    <p>Listed :${this.timeListed.toLocaleString()}</p>
                </div>
                <button onclick="app.HousesController.removeHouse('${this.id}')" class="btn btn-danger delete-button"><i class="mdi mdi-trash-can"></i></button>
            </div>
        </div>
        `
    }
}