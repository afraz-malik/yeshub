import { ProductSectionInterface, RecommendedToolsTypes } from "./ProductInterface"

export interface StagesInterface extends StageOnlyInterface {
    sections: ProductSectionInterface[]
    recommendedTools: RecommendedToolsTypes[]
}

export interface StageOnlyInterface {
    _id: string
    title: string
    stageNumber: number | 0
    description: string
    image: string
    createdAt: string
    updatedAt: string
}

export interface StagesInterfaceArray {
    stages: StagesInterface[]
}
