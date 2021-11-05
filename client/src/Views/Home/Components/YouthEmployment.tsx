import React, { FC, ReactElement } from "react"
import { useHistory } from "react-router-dom"

type YouthEmployment = {
    bgWhite?: boolean
    onStageChange?: any
}

const YouthEmployment: FC<YouthEmployment> = ({ bgWhite = false }): ReactElement => {
    const { push } = useHistory()

    const onStageChange = (e: any) => {
        e.preventDefault()
        const { id: stageId } = e.currentTarget
        push(`/stage/${stageId}`)
    }

    return (
        <section className={`${bgWhite ? "bg-white" : "bg-light-grey"} pb-5`}>
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

                <div className="bg-white">
                    <div className="row">
                        <div className="col-12">
                            <h6 className="stage__sub-heading has-line shadow__bottom mb-3">
                                <span>Gender Transformative Approach</span>
                            </h6>
                        </div>

                        <div className="col-12 px-4">
                            <div className="stages bg-light-blue">
                                <div className="row">
                                    <div className="col-12 col-lg-4">
                                        <div className="stage__item h-100 d-flex flex-column">
                                            <h6 className="stage__item-heading stage-color-1 mt-3">Preparation</h6>

                                            <div className="row flex-1">
                                                <div className="col-12 col-sm-6 d-flex flex-column">
                                                    <div
                                                        className="stage stage-sm stage__bg-blue flex-1 move-down"
                                                        id={"1"}
                                                        onClick={onStageChange}
                                                    >
                                                        <div className="pt-2">
                                                            <h5 className="stage__name">Stage 1</h5>
                                                        </div>
                                                        <div className="pt-2">
                                                            <p className="stage__description">Labor market analysis</p>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className="stage stage-sm mt-3 stage__bg-blue flex-1 move-right move-sm-right move-down move-xs-down"
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
                                                </div>
                                                <div className="col-12 mt-3 mt-sm-0 col-sm-6">
                                                    <div
                                                        className="stage stage-lg stage__bg-blue move-right move-lg-right"
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4">
                                        <div className="stage__item">
                                            <h6 className="stage__item-heading stage-color-2 mt-3">
                                                Skills Development
                                            </h6>

                                            <div className="row">
                                                <div className="col-12">
                                                    <div
                                                        className="stage stage-sm stage__bg-light-blue move-down move-right move-lg-right"
                                                        id={"4"}
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
                                                </div>
                                                <div className="col-12">
                                                    <div
                                                        className="stage stage-sm mt-3 stage__bg-light-blue move-down move-right move-lg-right"
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
                                                </div>
                                                <div className="col-12">
                                                    <div
                                                        className="stage stage-sm mt-3 stage__bg-light-blue move-right move-lg-right"
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4">
                                        <div className="stage__item h-100 d-flex flex-column">
                                            <h6 className="stage__item-heading stage-color-3 mt-3">
                                                Sustainability and monitoring
                                            </h6>

                                            <div className="row flex-1">
                                                <div className="col-12 col-sm-6">
                                                    <div
                                                        className="stage stage-lg mt-2 stage__bg-lightest-blue move-down move-xs-down move-right move-sm-right"
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
                                                </div>
                                                <div className="col-12 mt-3 mt-sm-0 col-sm-6">
                                                    <div
                                                        className="stage stage-lg mt-2 stage__bg-lightest-blue"
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

                        <div className="col-12">
                            <h6 className="stage__sub-heading has-line shadow__top mt-3">
                                <span>Private Sector Engagement</span>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default YouthEmployment
