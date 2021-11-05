import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(isBetween)

export const isSameDay = (start: Date | string, end: Date | string) => {
    const startDate = dayjs(start).format("YYYY-MM-DD")
    const endDate = dayjs(end).format("YYYY-MM-DD")

    return startDate === endDate
}

export const isBetweenDay = (start: Date | string, end: Date | string, date: Date) => {
    return dayjs(date).isBetween(start, end)
}

export const isAfterDay = (start: Date | string, end: Date | string) => {
    return dayjs(start).isAfter(end)
}
