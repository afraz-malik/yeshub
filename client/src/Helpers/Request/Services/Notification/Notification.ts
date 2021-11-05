import axiosService from "../../axiosService"

const notification = {
    fetch: (page: number = 1) => axiosService.get("Notification/get?page="+page),
    actionPerformed: (id: string, actionPerformed: boolean = false) => axiosService.put(`Notification/read?ID=${id}`, {
        
        actionPerformed: actionPerformed
        
    }),
    read: (id: string) => axiosService.put(`Notification/read?ID=${id}`),
}

export default notification
