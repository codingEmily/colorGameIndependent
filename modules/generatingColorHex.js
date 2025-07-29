import { genRandomNum } from '/utils.js'

const TOP_OF_HEX_RANGE = 15

export function genSetOfColorsHex(rangeDifficulty) {
    let arrayOfColors = []

    const sizeOfRange =  TOP_OF_HEX_RANGE * (rangeDifficulty * .01);
    const rest_of_HEX_scale = TOP_OF_HEX_RANGE - sizeOfRange;
    const bottomOfRange = genRandomNum(0, rest_of_HEX_scale);
    const topOfRange = bottomOfRange + sizeOfRange;

    for (let i = 0; i <= 5; i++) {
        arrayOfColors.push(genColorCodeHex(bottomOfRange, topOfRange))
    }
    return arrayOfColors
}

export function genColorCodeHex(bottomOfRange, topOfRange) {
    let redCode = genEachColorHex(bottomOfRange, topOfRange)
    let greenCode = genEachColorHex(bottomOfRange, topOfRange)
    let blueCode = genEachColorHex(bottomOfRange, topOfRange)


    let finalCode = `#${redCode}${greenCode}${blueCode}`
    return finalCode 
}

function genEachColorHex(min, max) {
    let firstDigit = turnToLetter(genRandomNum(min, max))
    let secondDigit = turnToLetter(genRandomNum(0, TOP_OF_HEX_RANGE))

    let indHexColor = `${firstDigit}${secondDigit}`;
    return indHexColor
}

function turnToLetter(number) {
    let arrayOfHexLetters = ["A", "B", "C", "D", "E", "F"]
    let countLetters = 0

    for (let i = 10; i <= 15; i++) {
        if (number === i) {
            number = arrayOfHexLetters[countLetters]
        }
        countLetters++
    }
    return number
}