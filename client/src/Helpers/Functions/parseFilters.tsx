import { IFilters } from "../../Views/Calender/Components/ListView"
import { formatTime } from "../Date/time"

const parseFilters = (filter: IFilters): string => {
    const filters = Object.keys(filter)
        .map(key => {
            if (key === "characteristics") {
                return Object.keys(filter[key])
                    .map(character => {
                        return `${key}=${character}`
                    })
                    .join("&")
            } else if (key === "startDate" || key === "endDate") {
                // @ts-ignore
                return `${key}=${formatTime(filter[key], "YYYY-MM-DD")}`
            } else {
                // @ts-ignore
                return `${key}=${filter[key]}`
            }
        })
        .join("&")
    return filters
}

export default parseFilters
