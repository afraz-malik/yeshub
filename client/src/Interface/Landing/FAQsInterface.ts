export interface FAQsInterface {
    faq: FAQsSingleInterface
    renderRecommend?: any
    number?: number
    index?: number
}

export interface FAQsSingleInterface {
    _id: string
    title: string
    body: string
}

export interface FAQsSingleInterfaceArray {
    faqs: FAQsSingleInterface[]
}

export type FAQSidebarInterface = {
    sidebar: FAQSingleSidebarInterface
}

export type FAQSidebarArrayInterface = {
    sidebar: FAQSingleSidebarInterface[]
}

export type FAQSingleSidebarInterface = {
    _id: string
    title: string
    redirectUrl: string
    file: string
    fileType: string
}
