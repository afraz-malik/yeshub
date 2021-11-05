import { tabs } from "./../../Views/Home/Components/Elements/Product/Json/SectionText"

const getProductImage = (title = "") => {
    return tabs.find(tab => tab.text === title.trim())?.img || ""
}

export default getProductImage
