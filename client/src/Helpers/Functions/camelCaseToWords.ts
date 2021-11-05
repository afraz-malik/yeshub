const camelCaseToSentence = (word: string): string => {
    const wordWithSpace = word.replace(/"/g, "").replace(/([A-Z])/g, " $1")
    return wordWithSpace.charAt(0).toUpperCase() + wordWithSpace.slice(1)
}

export default camelCaseToSentence
