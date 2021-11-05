import React, { FC, ReactElement } from "react"
import { useHistory } from "react-router-dom"

type YouthEmployment = {
    bgWhite?: boolean
    onStageChange?: any
}

const YouthEmploymentV2: FC<YouthEmployment> = ({ bgWhite = false }): ReactElement => {
    const { push } = useHistory()

    const onStageChange = (e: any) => {
        e.preventDefault()
        const { id: stageId } = e.currentTarget
        push(`/stage/${stageId}`)
    }

    return (
        <section className={`${bgWhite ? "mc-border" : "bg-light-grey*"} mt-4 p-4 pb-5`}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section__heading">
                            <h4 className="title">How do successful projects start?</h4>
                            <p className="description">
                                The guide below provides information on how to design and implement a Youth <br />{" "}
                                Employment and Entrepreneurship project in a gender-transformative way.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white*">
                    <div className="row">
                        <div className="col-12">
                            <h6 className="text-blue fw-700 mb-3 d-flex flex-row justify-content-between">
                                <span>{ArrowLeft}</span>
                                <span>Gender Transformative Approach</span>
                                <span>{ArrowRight}</span>
                            </h6>
                        </div>

                        <div className="px-4*">
                            <div className="stages* bg-light-blue*">
                                <div className="d-flex flex-row" style={{ margin: 0 }}>
                                    <div className="flex-1 pr-1">
                                        <div className="stage__item h-100 d-flex flex-column">
                                            <h6
                                                style={{ marginLeft: 0, height: "55px" }}
                                                className="fs-18 fw-700 text-blue mt-3 bb-3 pb-3"
                                            >
                                                Preparation
                                            </h6>

                                            <div className="row flex-1" style={{ margin: 0 }}>
                                                <div className="d-flex flex-row">
                                                    <div className="d-flex flex-row">
                                                        <div
                                                            className="flex-1 stage-sm stage stage__bg-blue d-flex flex-column justify-content-between"
                                                            id={"1"}
                                                            onClick={onStageChange}
                                                        >
                                                            <div className="pt-2">
                                                                <h5 className="stage__name">Stage 1</h5>
                                                            </div>
                                                            <div className="pt-2">
                                                                <p className="stage__description">
                                                                    Labor market analysis
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className="d-flex m-auto">{DarkBlueRight}</span>
                                                    </div>

                                                    <div className="d-flex flex-row ">
                                                        <div
                                                            className="d-flex flex-1 stage stage-sm stage__bg-blue move-down move-xs-down flex-column justify-content-between"
                                                            id={"2"}
                                                            onClick={onStageChange}
                                                        >
                                                            <div className="pt-2">
                                                                <h5 className="stage__name">Stage 2</h5>
                                                            </div>
                                                            <div className="pt-2">
                                                                <p className="stage__description">
                                                                    Design and delimitation of your YEE project
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className="d-flex m-auto">{DarkBlueRight}</span>
                                                    </div>

                                                    <div className="d-flex flex-row">
                                                        <div
                                                            className=" flex-1 stage stage-sm stage__bg-blue move-down move-xs-down d-flex flex-column justify-content-between"
                                                            id={"3"}
                                                            onClick={onStageChange}
                                                        >
                                                            <div className="pt-2">
                                                                <h5 className="stage__name">Stage 3</h5>
                                                            </div>
                                                            <div className="pt-2">
                                                                <p className="stage__description">
                                                                    Formalization of alliances with target groups and
                                                                    mobilization of local actors
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column">
                                                            <span className="d-flex flex-1">
                                                                <span className="m-auto">{DarkBlueRight}</span>
                                                            </span>
                                                            <span className="d-flex flex-1">
                                                                <span className="m-auto">{DarkBlueRight}</span>
                                                            </span>
                                                            <span className="d-flex flex-1">
                                                                <span className="m-auto">{DarkBlueRight}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 pr-1">
                                        <div className="stage__item">
                                            <h6
                                                style={{ marginLeft: 0, height: "55px" }}
                                                className="fs-18 fw-700 stage-text-light-blue mt-3 bb-stage-lblue pb-3"
                                            >
                                                Skills Development
                                            </h6>

                                            <div className="row d-flex flex-column">
                                                <div className="d-flex flex-row col-12">
                                                    <div
                                                        className="stage flex-1 stage-sm stage__bg-light-blue"
                                                        id={"5"}
                                                        onClick={onStageChange}
                                                    >
                                                        <div className="pt-2">
                                                            <h5 className="stage__name">Stage 4</h5>
                                                        </div>
                                                        <div className="pt-2">
                                                            <p className="stage__description">
                                                                Continuous development of life skills
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="m-auto">{LightBlueRight}</span>
                                                </div>
                                                <div className="d-flex flex-row col-12">
                                                    <div
                                                        className="stage flex-1 stage-sm mt-3 stage__bg-light-blue move-lg-right"
                                                        id={"5"}
                                                        onClick={onStageChange}
                                                    >
                                                        <div className="pt-2">
                                                            <h5 className="stage__name">Stage 5</h5>
                                                        </div>
                                                        <div className="pt-2">
                                                            <p className="stage__description">
                                                                Preparing for employment
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="m-auto">{LightBlueRight}</span>
                                                </div>
                                                <div className="d-flex flex-row col-12">
                                                    <div
                                                        className="flex-1 stage stage-sm mt-3 stage__bg-light-blue move-lg-right"
                                                        id={"6"}
                                                        onClick={onStageChange}
                                                    >
                                                        <div className="pt-2">
                                                            <h5 className="stage__name">Stage 6</h5>
                                                        </div>
                                                        <div className="pt-2">
                                                            <p className="stage__description">
                                                                Preparing for entrepreneurship
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="m-auto">{LightBlueRight}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 pr-1">
                                        <div className="stage__item h-100 d-flex flex-column">
                                            <h6
                                                style={{ marginLeft: 0, height: "55px" }}
                                                className="fs-18 fw-700 text-blue mt-3 bb-3 pb-3"
                                            >
                                                Sustainability and monitoring
                                            </h6>

                                            <div className="d-flex flex-row flex-1">
                                                <div className="flex-1 d-flex flex-row">
                                                    <div
                                                        className="stage flex-1 stage-lg mt-2 stage__bg-blue d-flex flex-column justify-content-between"
                                                        id={"7"}
                                                        onClick={onStageChange}
                                                    >
                                                        <div className="pt-2">
                                                            <h5 className="stage__name">Stage 7</h5>
                                                        </div>
                                                        <div className="pt-2">
                                                            <p className="stage__description">
                                                                Sustainability at the individual level
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="m-auto">{DarkBlueRight}</span>
                                                </div>
                                                <div className="flex-1 d-flex flex-column">
                                                    <div
                                                        className="stage stage-lg mt-2 stage__bg-blue d-flex flex-column justify-content-between"
                                                        id={"8"}
                                                        onClick={onStageChange}
                                                    >
                                                        <div className="pt-2">
                                                            <h5 className="stage__name">Stage 8</h5>
                                                        </div>
                                                        <div className="pt-2">
                                                            <p className="stage__description">
                                                                Sustainability at the YEE project level
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-12">
                                        <div className="stage9">
                                            <div
                                                className="row align-items-sm-center flex-column flex-sm-row"
                                                id={"9"}
                                                onClick={onStageChange}
                                            >
                                                <div className="pt-2 col-12 col-sm-3 col-md-2">
                                                    <h5 className="stage__name">Stage 9</h5>
                                                </div>
                                                <div className="pt-2 col-12 col-sm text-md-center">
                                                    <h4 className="stage__description">
                                                        Monitoring, evaluation and creation of knowledge
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 mt-4">
                            <h6 className="has-line mt-3 d-flex flex-row justify-content-between capitalized">
                                <span>{ArrowLeft}</span>
                                <span className="text-blue fw-700 capitalized">
                                    Involvement of the private sector engagement
                                </span>
                                <span>{ArrowRight}</span>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default YouthEmploymentV2

export const DarkBlueRight = (
    <svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 10.5L0 0V21L11 10.5Z" fill="#0841AC" />
    </svg>
)

const LightBlueRight = (
    <svg width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 10.5L0 0V21L11 10.5Z" fill="#3384FD" />
    </svg>
)

const ArrowRight = (
    <svg width="261" height="23" viewBox="0 0 261 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.30516e-07 11.5L258.5 11.5M258.5 11.5L249 21M258.5 11.5L249 2" stroke="#0841AC" stroke-width="3" />
    </svg>
)

const ArrowLeft = (
    <svg width="262" height="23" viewBox="0 0 262 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M261.5 11.5H3M3 11.5L12.5 2M3 11.5L12.5 21" stroke="#0841AC" stroke-width="3" />
    </svg>
)
