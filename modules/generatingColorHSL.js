import { genRandomNum } from '../utils.js'

const TOP_OF_HSL_COLOR_RANGE = 255
const FULL_SAT_AND_VALUE_RANGE = 100

// hsl(146, 75%, 46%)

export function genSetOfColorsHSL(rangeDifficulty) {
    let setOfColors = []
    let [bottomOfHueRange, topOfHueRange] = genSlices( TOP_OF_HSL_COLOR_RANGE, rangeDifficulty)
    let [bottomOfSatOrValueRange, topOfSatOrValueRange] = genSlices( FULL_SAT_AND_VALUE_RANGE, rangeDifficulty)

    for (let i = 0; i <= 5; i++) {
        let eachColor = `hsl(
        ${genRandomNum(bottomOfHueRange, topOfHueRange)}, 
        ${genRandomNum(bottomOfSatOrValueRange, topOfSatOrValueRange)}%, 
        ${genRandomNum(bottomOfSatOrValueRange, topOfSatOrValueRange)}%)`
        setOfColors.push(eachColor)
    }
    return setOfColors
}


function genSlices(maxRangeByType, rangeDifficulty) {
    const sizeOfRange =  Math.floor(maxRangeByType * (rangeDifficulty * .01));
    const restOfRange = maxRangeByType - sizeOfRange;
    const bottomOfRange = genRandomNum(0, restOfRange);
    const topOfRange = bottomOfRange + sizeOfRange;
    // let code = genRandomNum(bottomOfRange, topOfRange)

    return [bottomOfRange, topOfRange]
}

// export function genColorCodeHSL(rangeDifficulty) {
//     let hueCode = genSlices(TOP_OF_HSL_COLOR_RANGE, rangeDifficulty)
//     let sat = genSlices(FULL_SAT_AND_VALUE_RANGE, rangeDifficulty)
//     let value = genSlices(FULL_SAT_AND_VALUE_RANGE, rangeDifficulty)

//     let finalCode = `hsl(${120}, ${100}%, ${50}%)`

//     return finalCode
// }

