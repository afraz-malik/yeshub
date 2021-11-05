import * as React from "react"
import SweetAlert, { SweetAlertResult } from "sweetalert2"

import Report from "../../Helpers/Request/Services/Report"

export type ReportBtnType = "event" | "post" | "comment"

export interface ReportBtnProps {
    id: string
    type?: ReportBtnType
}

const ReportBtn: React.FC<ReportBtnProps> = ({ id, type = "post" }) => {
    const handleReport = () => {
        SweetAlert.fire({
            title: "Report",
            icon: "info",
            input: "textarea",
            inputPlaceholder: "Please explain the reason...",
            showCancelButton: true,
        }).then(({ isConfirmed, value: reason }: SweetAlertResult) => {
            if (isConfirmed) {
                Report.report({ reason, [type]: id })
            }
        })
    }

    return (
        <div className="post-report" onClick={handleReport}>
            <span className="icon">
                <svg className="post__icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM11 12H9V10H11V12ZM11 8H9V4H11V8Z" />
                </svg>
            </span>
            <span className="text">Report</span>
        </div>
    )
}

export default ReportBtn
