import { CURRENT_AD_INDEX, SET_CURRENT_AD_INDEX } from "../actions"

function typedAction<T extends string>(type: T): { type: T }
function typedAction<T extends string, P extends any>(type: T, payload: P): { type: T; payload: P }

function typedAction(type: string, payload?: number) {
    return { type, payload }
}

export type AdIndex = {
    index: number
}

export const initialValues: AdIndex = sessionStorage.getItem("ad_idx")
    ? JSON.parse(sessionStorage.getItem("ad_idx") || "{}")
    : { index: 0 }

const Storage = (adIdx: AdIndex) => {
    sessionStorage.setItem("ad_idx", JSON.stringify(adIdx))
}

const setIndex = (index: number) => {
    return typedAction(SET_CURRENT_AD_INDEX, { index })
}

const getIndex = () => {
    return typedAction(CURRENT_AD_INDEX)
}

type AddActions = ReturnType<typeof setIndex | typeof getIndex>

export const AdReducer = (state = initialValues, action: AddActions) => {
    switch (action.type) {
        case CURRENT_AD_INDEX:
            return state
        case SET_CURRENT_AD_INDEX:
            Storage(action.payload)
            state = action.payload
            return state
        default:
            return state
    }
}
