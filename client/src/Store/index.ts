import { combineReducers } from "redux"

import { userReducer } from "./reducers/user"

export const rootReducer = combineReducers({
    user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>
