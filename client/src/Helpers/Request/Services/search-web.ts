import axiosService from "../axiosService"

export const SearchWeb = {
    search: (keyword: string) =>
        axiosService.get("web/search/yeshub?search="+keyword),
}
