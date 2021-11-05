import * as React from "react"
import Slider from "react-slick"
import { ArrowRight, ArrowLeft } from "../../../Shared/Arrows"
import slider from "../../../Helpers/Request/Services/Slider"
import assetUrl from "../../../Helpers/Functions/assetUrl"

export interface AboutSliderProps {}

export type SliderResponse = {
    image: string
    _id: string
}

const AboutSlider: React.FC<AboutSliderProps> = () => {
    const [images, setImages] = React.useState<SliderResponse[]>([])

    React.useEffect(() => {
        slider.fetch.then(response => {
            // setImages(response.data.data)
            setImages([
                {
                    image: "https://apihub.yesdigital.org/slides/1594200551281SLIDE%201%20-%20v2.png",
                    _id: "",
                },
                {
                    image: "https://apihub.yesdigital.org/slides/1594200552152SLIDE%202%20-%20v2.png",
                    _id: "",
                },
                {
                    image: "https://apihub.yesdigital.org/slides/1594200647429SLIDE%203%20-%20v3.png",
                    _id: "",
                },
            ])
        })
    }, [])

    return (
        <div className="about__slider">
            <Slider dots nextArrow={ArrowRight} prevArrow={ArrowLeft}>
                {images.map(img => (
                    <img src={assetUrl(img.image)} key={img._id} alt={img._id} />
                ))}
            </Slider>
        </div>
    )
}

export default AboutSlider
