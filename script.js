import { genColorCodeHex } from "./modules/generatingColorHex.js";
import { genColorCodeRGB, genSetOfColorsRGB } from './modules/generatingColorRGB.js';
import { genSetOfColorsHSL } from './modules/generatingColorHSL.js';

import { genRandomNum } from './utils.js'

const PERCENTAGE_OF_COLOR_SCALE = {
    EASY: 100, 
    MEDIUM: 60,
    HARD: 10,
}
// console.log(genColorCodeHex(PERCENTAGE_OF_COLOR_SCALE.EASY))
// console.log(genColorCodeRGB(PERCENTAGE_OF_COLOR_SCALE.EASY))
// console.log(genColorCodeHSL(PERCENTAGE_OF_COLOR_SCALE.EASY))

console.log(genSetOfColorsHSL(PERCENTAGE_OF_COLOR_SCALE.HARD))

const easy = document.querySelector('#easy')
const medium = document.querySelector('#medium')
const hard = document.querySelector('#hard')

const rgbSelector = document.querySelector('#rgb')
const hexSelector = document.querySelector('#hex')
const hslSelector = document.querySelector('#hsl')

const form = document.querySelector('.form')

const winningColorCode = document.querySelector(".color-string")
const colorGrid = document.querySelector('.color-grid')
const showResult = document.querySelector('#show-result')
const buttonStyleWrong = document.querySelector('.wrong')
const buttonList = Array.from(colorGrid.querySelectorAll("button")) 
const resultsBanner = document.querySelector('.results')

let randomButtonId = genRandomNum(1, buttonList.length)
let id = 0

/*
INITIAL WINDOW LOAD
-Easy and TGB are checked
-Game is ready to play

ON EVENTS: change in difficulty, change in colorFormatting, or nextButton clicked
- prevent reset- the settings are not changed except by user
- play Game using the selected formatting and difficulty

HOW TO DO ^ BRAINSTORMING
- create a startGame function without with the game is not playable
- the startGame runs once on inital window load/reload, taking in "RGB" and "Easy"

**
- after that the function runs only on user input, and takes in session-Stored info for "format" and "difficulty"
OR
- on every user input, PREVENT REFRESH- that way in theory the settings shouuuldn't ever be erased
- test this by creating a simple function that tests if user input is carrying thru events
ANSWER - if the function ONLY RUNS on an eventListener WITHOUT preventDefault(), then the user input is comepletely saved, and only changes on window reload
**
*/

// document.addEventListener("load", e => {
//     let selectedFormat = form.elements.format.value
//     let selectedDifficulty = form.elements.difficulty.value
// console.log(selectedDifficulty, selectedFormat)


//     startGame()
// })


document.addEventListener("click", e => {    
    let selectedFormat = form.elements.format.value
    let selectedDifficulty = form.elements.difficulty.value
    // console.log(selectedDifficulty, selectedFormat)

    if (e.target.type ==='radio') {
        buttonList.forEach(button => {
            resetForNewRound(button)
// ASSIGN COLORS CODE ///////////
            id++ 
            button.setAttribute('data-color-code', genColorsByFormatAndLevel(selectedFormat, selectedDifficulty))
            // console.log(genColorsByFormatAndLevel(selectedFormat, selectedDifficulty))
            button.setAttribute('data-btn-id', id)
            button.style.backgroundColor = `${button.dataset.colorCode}`

            if (button.dataset.btnId == Number(randomButtonId)) {
                winningColorCode.textContent = button.dataset.colorCode
            }

            button.addEventListener("click", () => {
                checkCorrect(button)
            })
        })

    }
})

function genColorsByFormatAndLevel(selectedFormat, selectedDifficulty) {
    switch (selectedFormat) {
        case "rgb":
            return genColorCodeRGB(translateDifficulties(selectedDifficulty))    
        case "hex":
            return genColorCodeHex(translateDifficulties(selectedDifficulty))
        // case "hsl":
        //     return genColorCodeHSL(translateDifficulties(selectedDifficulty))
        // default:
            alert("Error processing user input for -Format- Section", selectedFormat)
            break;
    }
}

function translateDifficulties(selectedDifficulty) {
    let interpretedLevel
    switch (selectedDifficulty) {
        case "easy":
            interpretedLevel = PERCENTAGE_OF_COLOR_SCALE.EASY   
            break;
        case "medium":
            interpretedLevel = PERCENTAGE_OF_COLOR_SCALE.MEDIUM   
            break;
        case "hard":
            interpretedLevel = PERCENTAGE_OF_COLOR_SCALE.HARD   
            break;
        default:
            alert("Error processing user input for -Difficulty- Section", selectedDifficulty)
            break;
    }
    return interpretedLevel
}


// function checkCorrect(button) {
//     if ((button.dataset.btnId == Number(randomButtonId))) { //important that this be a loose-equal
//         handleEndOfRound("Correct")
//     } else if (button.dataset.btnId != Number(randomButtonId)) {
//         handleEndOfRound("Wrong")
//     }
// }


// function handleEndOfRound(result) {
//     showResult.textContent = result
//     resultsBanner.classList.remove("hide")
    
//     buttonList.forEach(button => {
//         button.disabled = true    
//         if (button.dataset.btnId != Number(randomButtonId)) {
//             button.classList.add("wrong")
//         }        
//     })
// }


function resetForNewRound(button) {
    resultsBanner.classList.add("hide")
    button.classList.remove("wrong")
    button.disabled = false    
}
