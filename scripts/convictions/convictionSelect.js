import { useConvictions, getConvictions } from "./convictionProvider.js"

const contentTarget = document.querySelector(".filters__crime")

export const ConvictionSelect = () => {
    getConvictions() 
        .then(
            () => {
             const convictions = useConvictions()
             console.log(convictions)
        render(convictions)    
            }  
        )
       
}


const render = convictionsCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime... </option>
            ${
                convictionsCollection.map(
                    conviction => {
                    const convictionListItem = conviction.name
                    return `<option> ${convictionListItem}</option>`
                    })
            }
        </select>
    `
}