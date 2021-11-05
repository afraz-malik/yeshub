import * as React from "react"
import ReactDOM from "react-dom"

export interface ModalProps {
    children: React.ReactNode | React.ReactNode[]
    isOpened: boolean
    otherProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

const modalRoot = document.querySelector("#modal-root")

const Modal: React.FC<ModalProps> = ({ otherProps, children, isOpened = false }) => {
    const parentEle = document.createElement("div")
    React.useEffect(() => {
        modalRoot?.appendChild(parentEle)

        return () => {
            modalRoot?.removeChild(parentEle)
        }
    }, [])

    React.useEffect(() => {
        if (isOpened) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }

        return () => document.body.classList.remove("modal-open")
    }, [isOpened])

    const styles = isOpened
        ? {
              display: "block",
              paddingRight: "12px",
          }
        : {}

    return ReactDOM.createPortal(
        <div
            style={styles}
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
            {...otherProps}
            className={`modal fade ${isOpened ? "in show" : ""} ${otherProps?.className}`}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">{children}</div>
            </div>
        </div>,
        parentEle
    )
}

export default Modal
