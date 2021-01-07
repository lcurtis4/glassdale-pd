import { getCriminals, useCriminals } from "./criminalProvider.js" 
import { Criminal } from "./criminal.js"
import { useConvictions } from "../convictions/convictionProvider.js"
import { useOfficers } from "../officers/officerProvider.js"
import { getFacilities, useFacilities } from "../facility/facilityProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "../facility/criminalFacilityProvider.js"

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

/* 
const render = (criminals) => {
    let criminalCards =[]
    for (const perp of criminals) {
        criminalCards.push(Criminal(perp))
    }

    criminalElement.innerHTML = criminalCards.join("") 
}
*/

let criminals = []
let facilities = []
let criminalFacilities = []

const render = (criminalsToRender) => {
    // Step 1 - Iterate all criminals
    contentTarget.innerHTML = criminalsToRender.map(
        (criminalObject) => {
            // Step 2 - Filter all relationships to get only ones for this criminal
            const facilityRelationshipsForThisCriminal = criminalFacilities.filter(cf => cf.criminalId === criminalObject.id)

            // Step 3 - Convert the relationships to facilities with map()
            const matchingFacilities = facilityRelationshipsForThisCriminal.map(cf => {
                const matchingFacilityObject = facilities.find(facility => facility.id === cf.facilityId)
                return matchingFacilityObject
            })

            // Must pass the matching facilities to the Criminal component
            return Criminal(criminalObject, matchingFacilities)
        }
    ).join("")
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
    getCriminals()
    .then(getFacilities)
    .then(getCriminalFacilities)
    .then(
        ()=> {
            facilities = useFacilities()
            criminalFacilities = useCriminalFacilities()
            criminals = useCriminals()
            render(criminals, facilities, criminalFacilities)
        }
    )
}
