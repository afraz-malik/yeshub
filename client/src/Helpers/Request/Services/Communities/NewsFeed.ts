import axiosService from '../../axiosService'

const NewsFeed = {
    fetch: (page: number = 1) => axiosService.get(`/general/newsFeed?page=${page}`),
}

export default NewsFeed
