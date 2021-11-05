export const count = (toCount: [] | object | string) => {
    if (typeof toCount === "object") {
        return Object.keys(toCount).length
    } else if (typeof toCount === "string" || Array.isArray(toCount)) {
        return toCount.length
    } else {
        throw new Error("Given parameter must be an object, Array or string")
    }
}
