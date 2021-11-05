import React from "react"
import ReactDOM from "react-dom"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import AlertBox from "./Shared/Alert/alert"
import { rootReducer } from "./Store"

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            <AlertBox />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
