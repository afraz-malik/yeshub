import React, { FC, useEffect, useState } from "react"

interface Modal {
    wrapperClass?: string
    id?: string
    role?: string
    style?: object
    innerWrapperClass?: string
    isOpened: boolean
}

const Modal: FC<Modal> = ({
    children,
    wrapperClass,
    id,
    style,
    role,
    innerWrapperClass,
    isOpened = false,
}) => {
    const [isOpen, setIsOpen] = useState(isOpened)

    useEffect(() => {
        setIsOpen(isOpened)
    }, [isOpened])

    return (
        <div
            className={wrapperClass}
            role={role}
            id={id}
            style={isOpen ? style : { display: "none" }}
        >
            <div className={innerWrapperClass}>{children}</div>
        </div>
    )
}

export default Modal
