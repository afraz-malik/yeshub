import * as React from "react"

export interface ModalBodyProps {
    children: React.ReactNode | React.ReactNode[]
}

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
    return (
        <div className="modal-body">
            {children}
        </div>
    )
}

export default ModalBody
