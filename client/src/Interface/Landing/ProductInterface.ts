export interface ProductInterface {
    _id: string
    title: string
    shortDescription: string
    videoUrl: string
    description: string
    animationFile: string
    sections: ProductSectionInterface[]
    recommendedTools: RecommendedToolsTypes[]
}

export interface ProductSectionInterface {
    _id: string
    title: string
    body: string
}

export interface ProductSectionSingleInterface {
    section: ProductSectionInterface
}

export type ProductSectionInterfaceArray = {
    sections: ProductSectionInterface[]
}

export interface RecommendedToolsTypes {
    _id: string
    title: string
    redirectUrl: string
    file: string
    fileType: string
}

export interface RecommendedToolsTypeSingleInterface {
    tool: RecommendedToolsTypes
}

export interface RecommendedToolsTypesArray {
    tools: RecommendedToolsTypes[]
}
