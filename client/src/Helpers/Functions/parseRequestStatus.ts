export enum REQUEST_STATUS {
    NOT_SENT = "NOT_SENT",
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
}

const parseRequestStatus = (status: number): string => {
    switch (status) {
        case 0:
            return REQUEST_STATUS.NOT_SENT
        case 1:
            return REQUEST_STATUS.PENDING
        case 2:
            return REQUEST_STATUS.ACCEPTED
        case 3:
            return REQUEST_STATUS.REJECTED
        default:
            return REQUEST_STATUS.NOT_SENT
    }
}

export default parseRequestStatus
