import { createContext } from "react"

const ModalContext = createContext({
    openModal: false,
    setOpenModal: (set: boolean) => {},
    modalType: "login",
    setModalType: (set: string) => {},
    modalContent: {},
    setModalContent: (data: any) => {},
})

export { ModalContext }

export default ModalContext
