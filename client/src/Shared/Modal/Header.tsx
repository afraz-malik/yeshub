import * as React from "react"

export interface ModalHeaderProps {
    toggleModal: () => void
    children?: React.ReactNode | React.ReactNode[]
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ toggleModal, children }) => {
    return (
        <div className="modal-header">
            {children}
            <button className="close" onClick={toggleModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default ModalHeader
