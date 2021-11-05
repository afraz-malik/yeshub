import React, { FC } from "react"
import { Link } from "react-router-dom"

type FormHeader = {
    title: string
    showDrafts?: boolean
}

const FormHeader: FC<FormHeader> = ({ title, showDrafts = true }) => (
    <div className="cp-header pb-1 bb-1">
        <div className="d-flex justify-content-between">
            <span className="head">{title}</span>
            {showDrafts ? (
                <Link to={"/profile/drafts"}>
                    <span className="draft-data">
                        <span className="text text-uppercase">Draft</span>
                        <span className="badge badge-secondary count">1</span>
                    </span>
                </Link>
            ) : null}
        </div>
    </div>
)

export default FormHeader
