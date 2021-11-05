import { ReportData } from "../../../Models/General"
import axiosService from "../axiosService"

const Report = {
    report: (data: ReportData) => axiosService.post("report", data),
}

export default Report
