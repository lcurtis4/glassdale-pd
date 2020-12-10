const contentTarget = document.querySelector(".witnessListButton")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "showWitness") {
        const customEvent = new CustomEvent("showWitnessClicked")
        eventHub.dispatchEvent(customEvent)
    }
})

export const ShowWitnessButton = () => {
    contentTarget.innerHTML = "<button id='showWitness'>Show Witness</button>"
}