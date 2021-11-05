const keyIncluded = (object: any, toCheck: string) => {
    return !!Object.keys(object).find(item => item === toCheck)
}

export default keyIncluded
