import axiosService from "../../axiosService"

export const Verify = {
    email: (email: string, hash: string) =>
        axiosService.post("/user/activateAccount", {
            email,
            hash,
        }),
}
