import { getCriminals, useCriminals } from "../criminalProvider.js";
import { AlibiHTMLConverter } from "./alibi.js"

const contentTarget = document.querySelector(".associates")
const eventHub = document.querySelector(".criminalsContainer")

eventHub.addEventListener("showAlibiClicked", (event) => {
    
    if (event.detail.criminalIdWasChosen !== "0") {
        const criminals = useCriminals()
        const chosenCriminals = criminals.find( (criminal) => criminal.id == parseInt(event.detail.criminalIdWasChosen) ) 
        
        const associates = chosenCriminals.known_associates 
        contentTarget.innerHTML = associates.map(associate => AlibiHTMLConverter(associate)).join("")
        }
})


export const criminalList = () => {
    getCriminals()
        .then(() => {
            const perps = useCriminals()
            render(perps)
        })
}
