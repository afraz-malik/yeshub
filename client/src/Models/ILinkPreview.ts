export interface ILinkPreview {
    url: string
    meta: Meta
    links: Links
    rel: string[]
    html: string
}

export interface Links {
    thumbnail: Thumbnail[]
    icon: Icon[]
}

export interface Icon {
    type: string
    rel: string[]
    href: string
}

export interface Thumbnail {
    content_length: number
    media: Media
    rel: string[]
    type: string
    href: string
}

export interface Media {
    height: number
    width: number
}

export interface Meta {
    site: string
    canonical: string
    "theme-color": string
    title: string
    description: string
}
