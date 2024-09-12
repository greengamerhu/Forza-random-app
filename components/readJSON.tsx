import { CarDetails } from './CarDetails'
import cars from '../assets/cars2.json'
let dikk  = JSON.stringify(cars)
let data = JSON.parse(dikk) as CarDetails[]
export  function getCarsList() {
    return data
}
export function getTypes() {
    let types = [] as string[]
    data.forEach(item => {
        if(!types.includes(item.Type) && item.Type != ""){
            types.push(item.Type)
        }
    })
    return types
}