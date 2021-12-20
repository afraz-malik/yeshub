import React, { FC, ReactElement, useState } from "react"
import assetUrl from "../../../../../../Helpers/Functions/assetUrl"

type StageHeader = {
    number: number
    title: string
    description: string
    image: string
    onShowTools?: any
    onShowContent?: any
    content?: string
}

export const StageHeader: FC<any> = ({ number, title, description, image }): ReactElement => {
    const [content, setcontent] = useState("content")
    return (
        <section className="mb-4 pt-4">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="jumbotron bg-white">
                            <div className="row">
                                <div className="col-md-5">
                                    <h1 className="stage__title">Stage {number}</h1>
                                    <p className="stage__sub-title">{title}</p>
                                    <p>{description}</p>
                                </div>
                                <div className="col-md-7 text-center">
                                    <img src={assetUrl(image)} className="img-fluid stage__img" alt={title} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const StageHeaderNew: FC<StageHeader> = ({
    number,
    title,
    description,
    image,
    onShowTools,
    onShowContent,
    content,
}): ReactElement => {
    // const [content, setcontent] = useState(content)
    console.log(number)
    return (
        <section className="mb-4">
            <div className="container">
                <div className="bg-white">
                    <div className="row">
                        <div className="state__img_title__container">
                            <img src={image} className="img-fluid br-8" alt={title} />
                            <div className="stage__title__container">
                                {
                                    number < 4  ?<p className="stage__prepration_Text pl-3 pr-3">PREPARATION</p> : null
                                }
                                                                {
                                    number > 3 && number < 7  ?<p className="stage__prepration_Text pl-3 pr-3">SKILLS DEVELOPMENT</p> : null
                                }
                                 {
                                    number > 6  ?<p className="stage__prepration_Text pl-3 pr-3" >SUSTAINABILITY AND MONITORING
                                    </p> : null
                                }
                                {/* <p className="stage__prepration_Text pl-3 pr-3">PREPARATION</p> */}
                                {/* {number == 1 && <p className="stage__prepration_Text pl-3 pr-3">PREPARATION</p>} */}
                                {/* <h5 className="stage__title pl-3 pr-3">Stage {number}</h5> */}
                                <h5 className="stage__title pl-3 pr-3"> {title}</h5>
                                <p style={{ color: "white" }} className="pl-3 pr-3">
                                    {description}
                                </p>
                            </div>
                            {/* <p className="pl-3 pr-3 pt-3">{description}</p> */}
                            <div className="pl-3 pr-3 pt-3">
                                <p>
                                    <span
                                        className="cursor-pointer"
                                        style={{
                                            padding: "5px 15px",
                                            marginRight: "10px",
                                            borderBottom: `${content === "content" ? "3px solid yellow" : "0px"}`,
                                        }}
                                        onClick={() => {
                                            // setcontent("content")
                                            onShowContent()
                                        }}
                                    >
                                        Content
                                    </span>
                                    <span
                                        className="cursor-pointer"
                                        style={{ borderBottom: `${content === "tools" ? "3px solid yellow" : "0px"}` }}
                                        onClick={() => {
                                            // setcontent("tools")
                                            onShowTools()
                                        }}
                                    >
                                        Tools
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StageHeader
