import { reEmail, rePassword } from "../Constants/regularExpressions"

let errors: Array<any> = []

const Validate = (values: object) => {
    for (let [key, value] of Object.entries(values)) {
        if (
            value === "" ||
            value === false ||
            (key.includes("email") && !reEmail.test(value)) ||
            (key.includes("password") && !rePassword.test(value))
        ) {
            if (key.toUpperCase().includes("KNOWLEDGEGROUP")) {
                errors.push(`Select a Community to proceed!`)
            } else {
                errors.push(`${key.toUpperCase()} is required`)
            }
            if (key.includes("email") && !reEmail.test(value))
                errors.push(`Please Enter a valid ${key.toUpperCase()}`)
            if (key.includes("password") && !rePassword.test(value))
                errors.push(
                    `${key.toUpperCase()} must be at least 12 characters long and combination of upper case letters, lower case letters and numbers`
                )
        } else {
            let index: number
            if (key === "knowledgeGroup") {
                index = errors.findIndex(item => {
                    let items = item.includes("Community")
                    if (items) return item
                    else return items
                })
            } else {
                index = errors.findIndex(item => {
                    let items = item.includes(key.toUpperCase())
                    if (items) return item
                    else return items
                })
            }
            if (index !== -1) {
                errors.splice(index)
            }
        }
    }
    //@ts-ignore
    return [...new Set(errors)]
}

export { Validate }
