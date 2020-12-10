//const eventHub = document.querySelector(".container")
let witness = []

export const useWitness = () => witness.slice()

export const getWitness = () => {
    return fetch('https://criminals.glassdale.us/witnesses')
        .then(response => response.json())
        .then(parsedWitness => {
            witness = parsedWitness
        })

}


/*export const saveWitness = witness => {
    return fetch('https://criminals.glassdale.us/witnesses. ', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    .then(getWitness)
} */