import { REG_EXP_URL } from "../../Constants/constants"

export const isURL = (url: string) => {
    return REG_EXP_URL.test(url)
}
