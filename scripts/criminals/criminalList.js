import { getCriminals } from "./criminalProvider.js" 
import { useCriminals } from "./criminalProvider.js" 
import { Criminal } from "./criminal.js"
getCriminals() 
useCriminals() 

export const CriminalList = () => {
    getCriminals().then( 
        () => {
            const usedCriminals = useCriminals()
            const contentElement = document.querySelector(".criminalsContainer")
            for (const criminal of usedCriminals) {
                const criminalHTML = Criminal(criminal)
                contentElement.innerHTML += criminalHTML

            }
        }
    )
}