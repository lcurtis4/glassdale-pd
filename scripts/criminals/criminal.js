export const Criminal = (criminal) => {
    return `
    <article class="criminal">
        <h2 class="criminal_name">Name: ${criminal.name}</h2>
        <div class="criminal_age">Age: ${criminal.age}</div>
        <div class="criminal_crime">Crime: ${criminal.conviction}</div>
        <div class="incarceration_start">Term Start: ${new Date(criminal.incarceration.start).toLocaleDateString('en-US')} </div>
        <div class="incarceration_start">Term End: ${new Date(criminal.incarceration.end).toLocaleDateString('en-US')} </div>
        <button id="associates--${criminal.id}">Associate Alibis</button>
        </article>
    `
}

const eventHub = document.querySelector(".criminalsContainer")

eventHub.addEventListener("click", clickEvent => {
    const [splitId, indexOne] = clickEvent.target.id.split("--") 

    if ("associates" === splitId) {
        const customEvent = new CustomEvent("showAlibiClicked", {
            detail: {
                criminalIdWasChosen: indexOne 
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})

