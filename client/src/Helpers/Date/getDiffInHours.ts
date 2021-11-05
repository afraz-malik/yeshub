export const GetDateDiffInHours = (date: string): number => {
    const currentDate = new Date()
    const postDate = new Date(date)
    let differenceInHours = (postDate.getTime() - currentDate.getTime()) / 1000
    differenceInHours /= 60 * 60
    if (differenceInHours > 24) {
        differenceInHours /= differenceInHours * 24
    }
    return Math.abs(Math.round(differenceInHours))
}
