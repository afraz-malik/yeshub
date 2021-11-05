import React, { createContext, useReducer, FC } from "react"
import { AdReducer, AdIndex } from "./reducer/adReducer"
import { CURRENT_AD_INDEX, SET_CURRENT_AD_INDEX } from "./actions"

export const AdContext = createContext<any>({})

const storage: AdIndex = sessionStorage.getItem("ad_idx")
    ? JSON.parse(sessionStorage.getItem("ad_idx") || "{}")
    : { index: 0 }

const initial: AdIndex = storage
type AdContextProps = {}
export const AdContextProvider: FC<AdContextProps> = ({ children }) => {
    const { Provider } = AdContext
    const [state, dispatch] = useReducer(AdReducer, initial)

    const getIndex = () => {
        dispatch({
            type: CURRENT_AD_INDEX,
        })
    }

    const setIndex = (index: number) => {
        dispatch({
            type: SET_CURRENT_AD_INDEX,
            payload: { index },
        })
    }

    const values = {
        getIndex,
        setIndex,
        ...state,
    }

    return <Provider value={values}>{children}</Provider>
}
