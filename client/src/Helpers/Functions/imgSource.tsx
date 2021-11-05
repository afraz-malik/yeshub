import * as React from "react"

const imgSource = (img: string) => {
    if (img.indexOf("webp") !== -1) {
        return (
            <source className="team__img h-100" src={img} type="image/webp" />
        )
    } else {
        return <img className="team__img h-100" src={img} alt={img} />
    }
}

export default imgSource
