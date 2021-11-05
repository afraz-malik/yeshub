import axiosService from "../axiosService"

const share = {
    shareEvent: (communityID: string, parentID: string, eventID: string) =>
        axiosService.put(
            `general/event/share/to/community/?community=${communityID}&parent=${parentID}&event=${eventID}`
        ),
}

export default share
