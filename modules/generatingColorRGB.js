import { genRandomNum } from "/utils.js"

const TOP_OF_RGB_RANGE = 255;

export function genSetOfColorsRGB(rangeDifficulty) {
    const setOfColors = []
    let [bottomOfRange, topOfRange] = genCurrentScale(rangeDifficulty)
    
    for (let i = 0; i <= 5; i++) {
        setOfColors.push(genColorCodeRGB(bottomOfRange, topOfRange))
    }
    let checkValuesStatement = ["bottomOfRange: ", bottomOfRange, "topOfRange: ", topOfRange, "Set of colors: ", setOfColors]
    return setOfColors
}

export function genColorCodeRGB(bottomOfRange, topOfRange) {
    const rCode = genRandomNum(bottomOfRange, topOfRange)
    const gCode = genRandomNum(bottomOfRange, topOfRange)
    const bCode = genRandomNum(bottomOfRange, topOfRange)
    let finalCode = `rgb(${rCode}, ${gCode}, ${bCode})`

    return finalCode
}



function genCurrentScale(rangeDifficulty) {
    const sizeOfRange =  Math.floor(TOP_OF_RGB_RANGE * (rangeDifficulty * .01));
    const rest_of_RGB_scale = TOP_OF_RGB_RANGE - sizeOfRange;
    const bottomOfRange = genRandomNum(0, rest_of_RGB_scale); ///// KEY LOGIC
    const topOfRange = bottomOfRange + sizeOfRange;
    return [bottomOfRange, topOfRange]
}