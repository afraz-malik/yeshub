// @ts-nocheck
import React, { useEffect } from "react"
import ReactGA from "react-ga"
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from "react-toasts"

import Routes from "./Routes/Routes"
import NetworkDetector from "./Hoc/NetworkDetector"

import "react-datepicker/dist/react-datepicker.css"
import "bootstrap/dist/css/bootstrap.min.css"
// import "@fullcalendar/core/main.css"
// import "@fullcalendar/core/main.css"
// import "@fullcalendar/daygrid/main.css"
import "font-awesome/css/font-awesome.min.css"
import "./App.css"
import { GA_U_ID } from "./Constants/constants"

const gakey = "AIzaSyBSasKyj-ckpy1Z-vkxtdx6GhhqATD9_s8"

function initializeReactGA() {
    // ReactGA.initialize('UA-178539916-1');
    ReactGA.initialize(GA_U_ID)
    ReactGA.pageview("/")
}

function App() {
    let interval = null
    useEffect(() => {
        initializeReactGA()
    }, [])

    useEffect(() => {
        interval = setInterval(() => {
            let className = ""
            if (window.location.pathname == "/") {
                className = "nav.fixed-top"
            } else {
                className = "div.header.fixed-top"
            }
            let nav = document.querySelector(className)
            // console.log("nav: ", nav)
            let body = document.getElementsByClassName("goog-te-banner-frame")
            // console.log("body: ", body)
            if (body && body.length) {
                let mainDiv = document.getElementsByClassName("skiptranslate")
                if (mainDiv && mainDiv.length) {
                    let style = mainDiv[0].style.display
                    // console.log(style)
                    if (style == "") {
                        // console.log("nav: ", nav)
                        if (nav) {
                            nav.style.top = "38px"
                        }
                    } else {
                        if (nav) {
                            nav.style.top = "0px"
                        }
                    }
                }
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    return (
        <React.Fragment>
            <ToastsContainer position={ToastsContainerPosition.TOP_CENTER} store={ToastsStore} />
            <Routes />
        </React.Fragment>
    )
}

export default NetworkDetector(App)
