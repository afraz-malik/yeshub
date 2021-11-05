import * as React from "react"
import ReactSlick, { Settings as SlickSettings } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ArrowRight, ArrowLeft } from "./Arrows"

export interface SliderProps {
    children: React.ReactNode | React.ReactNode[]
    options?: SlickSettings
}

const Slider: React.FC<SliderProps> = ({ children, options }) => {
    const config = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: ArrowRight,
        prevArrow: ArrowLeft,
    }

    return (
        <ReactSlick {...config} {...options}>
            {children}
        </ReactSlick>
    )
}

export default Slider
