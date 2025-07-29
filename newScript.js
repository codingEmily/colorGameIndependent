import { genSetOfColorsHex } from "./modules/generatingColorHex.js";
import { genSetOfColorsRGB } from './modules/generatingColorRGB.js';
import { genSetOfColorsHSL } from './modules/generatingColorHSL.js';

import { genRandomNum } from './utils.js'

const PERCENTAGE_OF_COLOR_SCALE = {
    EASY: 100, 
    MEDIUM: 50,
    HARD: 20,
}

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


window.addEventListener("load", () => {
    setGame(PERCENTAGE_OF_COLOR_SCALE.EASY)
})

document.addEventListener("click", e => {   
    // console.log(selectedDifficulty, selectedFormat)
    if (e.target.type ==='radio' || e.target.id === 'next') {
        resetForNewRound()
        setGame()
    }
})


function setGame() {
    let selectedFormat = form.elements.format.value
    // console.log("FORMAT: ", selectedFormat)
    let selectedDifficulty = form.elements.difficulty.value

    let randomWinnerId = genRandomNum(1, buttonList.length)
    let id = 0

    const arrayOfColors = fetchColorsByFormatAndLevel(selectedFormat, selectedDifficulty)
    // console.log(arrayOfColors)
    buttonList.forEach(button => {
        button.setAttribute('data-btn-id', id)
        // console.log(arrayOfColors)
        button.setAttribute('data-color-code', arrayOfColors[id])
        
        button.style.backgroundColor = `${button.dataset.colorCode}`
        id++

        if (Number(button.dataset.btnId) == randomWinnerId) {
            winningColorCode.textContent = button.dataset.colorCode
        }
        button.addEventListener("click", () => {
            checkCorrect(button, randomWinnerId)
        }) 
        
    })
    resetForNewRound()
}


function resetForNewRound() {
    resultsBanner.classList.add("hide") 
    buttonList.forEach(button => {
        button.classList.remove("wrong")
        button.disabled = false
    })
}

function checkCorrect(button, randomWinnerId) {
    if ((Number(button.dataset.btnId) == Number(randomWinnerId))) {
        handleEndOfRound("Correct", randomWinnerId)
    } else if (Number(button.dataset.btnId) != Number(randomWinnerId)) {
        handleEndOfRound("Wrong", randomWinnerId)
    }
}

function handleEndOfRound(result, randomWinnerId) {
    showResult.textContent = result
    resultsBanner.classList.remove("hide")
    
    buttonList.forEach(button => {
        button.disabled = true    
        if (Number(button.dataset.btnId) != Number(randomWinnerId)) {
            button.classList.add("wrong")
        } else if (Number(button.dataset.btnId) == Number(randomWinnerId)) {
            button.classList.remove("wrong")
        }
    })
}

function fetchColorsByFormatAndLevel(selectedFormat, selectedDifficulty) {
    switch (selectedFormat) {
        case "rgb":
            return genSetOfColorsRGB(translateDifficulties(selectedDifficulty))    
        case "hex":
            return genSetOfColorsHex(translateDifficulties(selectedDifficulty))
        case "hsl":
            return genSetOfColorsHSL(translateDifficulties(selectedDifficulty))
        default:
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


