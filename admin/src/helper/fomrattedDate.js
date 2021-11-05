import dayjs from "dayjs"

export const formattedTime = (date, format = "h:MM A") => {
    return dayjs(date).format(format)
}