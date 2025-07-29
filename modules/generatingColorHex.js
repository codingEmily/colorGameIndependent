import { genRandomNum } from '/utils.js'

const TOP_OF_HEX_RANGE = 15

// if I generate the HEX code as numbers, I can KINDA use the same math as I did with RGB- then translate to letters for the code
// 0-9 and A-F (10-15) // first digit of each code is multiplied by 16, second digit is not multiplied- they are added together to create a number ranging from 0 to 255 for each color


export function genColorCodeHex(rangeDifficulty) {
    const sizeOfRange =  TOP_OF_HEX_RANGE * (rangeDifficulty * .01);
    const rest_of_HEX_scale = TOP_OF_HEX_RANGE - sizeOfRange;
    const bottomOfRange = genRandomNum(0, rest_of_HEX_scale);
    const topOfRange = bottomOfRange + sizeOfRange;

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