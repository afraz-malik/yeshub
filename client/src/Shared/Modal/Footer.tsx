import * as React from "react"

export interface ModalHeaderProps {
    children: React.ReactNode | React.ReactNode[]
}

const ModalFooter: React.FC<ModalHeaderProps> = ({ children }) => {
    return <div className="modal-footer">{children}</div>
}

export default ModalFooter
