export interface ProductJsonSchema {
    image: string
    content: ProductContentSchema[]
}

export interface ProductContentSchema {
    heading: string
    text: string
    icon: React.ReactNode | string
}

export interface ProductContentSchemaSingle {
    productContent: ProductContentSchema
}

export interface ProductJsonSchemaSingle {
    productContent: ProductJsonSchema
}
