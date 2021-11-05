import * as React from "react"
import axiosService from "../../../../Helpers/Request/axiosService"
import { OPEN_ALERTBOX } from "../../../../Shared/Alert/alert"

export interface DeActivateAccountProps {}

const logoutUser = () => {
    localStorage.clear()
    window.location.href = window.location.origin
}

const DeactivateAccountEvent = new CustomEvent(OPEN_ALERTBOX, {
    detail: {
        icon: "info",
        title: "Deactivate Account",
        text: "This action is permanent and irreversible. Are you sure you want to delete your account?",
        time: 1500,
        showCancelButton: true,
        successCallback: () => {
            axiosService.delete("user/deactivateAccount").then(() => {
                logoutUser()
            })
        },
    },
})

const DeActivateAccount: React.FC<DeActivateAccountProps> = () => {
    const deleteUser = () => {
        document.dispatchEvent(DeactivateAccountEvent)
    }

    return (
        <div className="mc-border px-5 mt-4 pt-5 pb-5 deactivate__Form">
            <div className="row">
                <div className="col-md-12">
                    <h6 className="event-head-text">Deactivate account</h6>
                    <p className="mb-0">
                        Deactivating your account will result in the deletion of all your data from our database. This
                        action is permanent.
                    </p>
                </div>
                <div className="col-md-12 text-right">
                    <button onClick={deleteUser} className="btn btn-danger text-white ">
                        Removeme from this platform
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeActivateAccount
