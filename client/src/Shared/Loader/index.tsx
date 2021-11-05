import React, { ReactElement } from "react"

const Loader = (): ReactElement => {
    return (
        <div className="text-center">
            <i className="fa fa-spinner fa-spin fa-2x"/>
        </div>
    )
}

export default Loader
