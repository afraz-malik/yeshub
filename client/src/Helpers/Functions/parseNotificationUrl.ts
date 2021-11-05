export default function parseUrl(url: string, key: string, data: string) {
    return url.replace(`{{${key}}}`, data)
}
