import { saveNote } from "./noteDataProvider.js"
import { useCriminals, getCriminals } from "../criminals/criminalProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")


/*const render = () => {
    contentTarget.innerHTML = `
        <input type="text" id="author" placeholder ="author name">
        <input type="text" id="suspect" placeholder ="suspect name">
        <textarea id="note" placeholder ="note"></textarea>
        <button id="saveNote">Save Note</button>
    `
}
*/

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        const author = document.querySelector("#author").value
        const suspect = document.querySelector("#suspect").value
        const text = document.querySelector("#note").value

        // Make a new object representation of a note
        const newNote = {
            author: author,
            text: text,
            suspect: suspect,
            timestamp: Date.now()
            // Key/value pairs here
        }

        // Change API state and application state
        saveNote(newNote)
    }
})

const render = () => {
    const criminalsCollection = useCriminals()

    contentTarget.innerHTML = `
    <section class="noteForm">
        <input type="text" id="author" placeholder="author name">
        <textarea id="text" placeholder="note text"></textarea>
    
        <select class="dropdown" id="suspect">
            <option value="0">Please select a suspect...</option>
            ${
                criminalsCollection.map(
                    (criminal) => `
                        <option value=${criminal.id}>
                        ${criminal.name}
                        </option>
                `)
            }
        </select>
        
        <button id="saveNote>Save Note</button>
        </section>
    `
}

export const NoteForm = () => {
    getCriminals()
    .then( () => render() )
}