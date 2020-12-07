import { useConvictions } from "../convictions/convictionProvider.js"
import { useOfficers, getOfficers }  from "./officerProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__officer")

eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "officerSelect") {
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value

        // Define a custom event
        const customEvent = new CustomEvent("officerSelected", {
            detail: {
                officer: selectedOfficer
            }
        })

        // Dispatch event to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

export const officerSelect = () => {
    getOfficers()
    .then(() => {
        const officers = useOfficers()
        console.log(officers)
        render(officers)
    })
}

const render = officersCollection => {
    contentTarget.innerHTML = `
    <select class="dropdown" id="officerSelect">
        <option value="0"> Please select a officer... </option>
        ${
            officersCollection.map((police) => `
            <option value="${police.id}">
                ${police.name}
                </option> `)
        }
        </select>
    `
}

export const OfficerSelect = () => {
    getOfficers()
    .then(
        () => {
            const officers = useOfficers()
            return useOfficers
        }
    )
}
 