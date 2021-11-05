export default function(str = "") {
    return (str.indexOf('http') !== -1 && str.indexOf('https') != -1)
}