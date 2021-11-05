export default function isBaseEncoded(str) {
    return str && str.indexOf("base64") !== -1;
}
