export default function ellipsis(str: string, length = 200) {
    if (str.length <= length) {
        return str
    }
    return str.substr(0, length).concat("...")
}
