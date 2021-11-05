import IUser from "./IUser"

export default interface IAuth {
    isLoggedIn: boolean
    user?: IUser
}
