import dayjs from "dayjs"

export const formattedTime = (date: string | Date, format = "h:MM A") => {
    return dayjs(date).format(format)
}
