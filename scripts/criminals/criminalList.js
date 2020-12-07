import { getCriminals, useCriminals } from "./criminalProvider.js" 
import { Criminal } from "./criminal.js"
import { useConvictions } from "../convictions/convictionProvider.js"
import { useOfficers } from "../officers/officerProvider.js"

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

eventHub.addEventListener("officerSelected", event => {
    // How can you access the officer name that was selected by the user?
    if (event.detail.selectedofficer !== "0"){

        const officers = useOfficers()
        const officer = officers.find( (officer) => officer.id === parseInt(event.detail.officer) )
        
        const criminals = useCriminals()
        const matchingCriminals = criminals.filter( (criminal) => {
            return criminal.arrestingOfficer === officer.name 
        })
        render(matchingCriminals)
    }
}
)
    // How can you get the criminals that were arrested by that officer?
    

export const CriminalList = () => {
    getCriminals().then( () => {
            let perps = useCriminals()
            render(perps)
        })
}
