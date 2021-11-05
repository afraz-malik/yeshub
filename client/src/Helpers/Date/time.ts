import dayjs from "dayjs"

export const getDay = (date: string | Date) => {
    return dayjs(date).format("DD MMM")
}

export const getDayNumb = (date: string | Date) => {
    return dayjs(date).format("DD")
}

export const getMonth = (date: string | Date) => {
    return dayjs(date).format("MMM")
}

export const getYear = (date: string | Date) => {
    return dayjs(date).format("YYYY")
}

export const formatTime = (time: string | Date, format = "hh:mm A") => {
    return dayjs(time).format(format)
}

export const getHours = (date: Date | string) => {
    return dayjs(date).hour()
}

export const setHours = (date: Date | string, hour: number) => {
    return dayjs(date).hour(hour)
}
