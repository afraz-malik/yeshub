import { initialState, UserAction, UserState } from "../actions/user"

export function userReducer(
    state = initialState,
    action: UserAction
): UserState {
    switch (action.type) {
        case "user/LOGIN":
            return { details: action.payload }
        case "user/LOGOUT":
            return { details: null }
        default:
            return state
    }
}
