import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

const relativeDate = (date: string | Date) => {
    return dayjs(date).fromNow()
}

export default relativeDate
