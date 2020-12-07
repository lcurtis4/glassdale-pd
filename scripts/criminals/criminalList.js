import { getCriminals, useCriminals } from "./criminalProvider.js" 
import { Criminal } from "./criminal.js"
import { useConvictions } from "../convictions/convictionProvider.js"

const criminalElement = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

const render = (criminals) => {
    let criminalCards =[]
    for (const perp of criminals) {
        criminalCards.push(Criminal(perp))
    }

    criminalElement.innerHTML = criminalCards.join("") 
}


eventHub.addEventListener('crimeChosen', event => {


    if (event.detail.crimeThatWasChosen !== "0"){
        
        
        
        console.log('crime', event.detail);
        const crimes = useConvictions()
        const crime = crimes.find( (crime) => crime.id === parseInt(event.detail.crimeThatWasChosen) )

        const criminals = useCriminals()
        const matchingCriminals = criminals.filter( (criminal) => criminal.conviction === crime.name )

        render(matchingCriminals)
    }
})

export const CriminalList = () => {
    getCriminals().then( () => {
            let perps = useCriminals()
            render(perps)
        })
}
