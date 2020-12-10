import { getWitness, useWitness } from "./witnessDataProvider.js";
import { WitnessHTMLConverter } from "./witness.js"

// Query the DOM for the element that your notes will be added to 
const contentTarget = document.querySelector(".witnessList")
// Define ye olde Evente Hubbe
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showWitnessClicked", () => {
    WitnessList()
})

const render = (witnessArray) => {
    const allWitnessConvertedToStrings = witnessArray.map(
        // convert the notes objects to HTML with NoteHTMLConverter
        (witness) => WitnessHTMLConverter(witness) ).join("")

    contentTarget.innerHTML = allWitnessConvertedToStrings 
}

// Standard list function you're used to writing by now. BUT, don't call this in main.js! Why not?
export const WitnessList = () => {
    getWitness()
        .then(() => {
            const allWitness = useWitness()
            render(allWitness)
        })
}
