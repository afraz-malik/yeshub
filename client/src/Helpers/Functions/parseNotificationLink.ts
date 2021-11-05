const parseNotificationLink = (link: string, id: string): string => {
    return link.replace("{{id}}", id || "")
}

export default parseNotificationLink
