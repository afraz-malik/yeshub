import { reEmail, rePassword } from "../Constants/regularExpressions"

let errors: Array<any> = []

const ValidateStringsOnly = (values: object) => {
    let error: any = undefined
    error = {}
    for (let [key, value] of Object.entries(values)) {
        error[key] = {}
    }

    for (let [key, value] of Object.entries(values)) {
        if (
            value === "" ||
            (key.includes("email") && !reEmail.test(value)) ||
            (key.includes("password") && !rePassword.test(value))
        ) {
            if (key.toUpperCase().includes("KNOWLEDGEGROUP")) {
                errors.push(`Select a Community to proceed!`)
            }
            if (key.includes("email") && !reEmail.test(value)) {
                errors.push(`Please enter a valid ${key.toUpperCase()}`)
                error["email"].isValid = false
                error["email"].errorInvalidMessage = "Please enter a valid Email"
            }

            if (key.includes("password") && !rePassword.test(value)) {
                errors.push(
                    `${key.toUpperCase()} must be at least 12 characters long and combination of upper case letters, lower case letters and numbers`
                )
                error["password"].isValid = false
                error["password"].errorInvalidMessage =
                    "Password must be at least 12 characters long and combination of upper case letters, lower case letters and numbers"
            }

            if (value === "") {
                errors.push(`Select a Community to proceed!`)
                error[key].isValid = false
                error[key].errorRequiredMessage = `${key} is Required`
            }
        } else {
            error[key].isValid = true
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
    // @ts-ignore
    return error
    // return [...new Set(errors)]
}

export { ValidateStringsOnly }
