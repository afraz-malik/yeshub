const parseCharacterics = (characteristics: string[]): { [index: string]: boolean } => {
    const characteristicsObject: { [index: string]: boolean } = {}
    for (let i = 0; i < characteristics.length; ++i) {
        const replaceString = /"/gi
        const characteric = characteristics[i].replace(replaceString, "").replace(replaceString, "")
        characteristicsObject[characteric] = true
    }
    return characteristicsObject
}

export default parseCharacterics
