import IUser from "../../Models/User/IUser"
import { LOGIN, LOGOUT } from "../../Constants/actionTypes"

export function typedAction<T extends string>(type: T): { type: T }
export function typedAction<T extends string, P extends any>(
    type: T,
    payload: P
): { type: T; payload: P }

export function typedAction(type: string, payload?: IUser) {
    return { type, payload }
}

export type UserState = {
    details: IUser | {} | null
}
export const initialState: UserState = { details: null }

export const login = (username: string, password: string) => {
    return typedAction(LOGIN, { username, password })
}

export const logout = () => {
    return typedAction(LOGOUT)
}

export type UserAction = ReturnType<typeof login | typeof logout>
