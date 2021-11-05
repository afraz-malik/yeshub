import * as React from "react"

export interface SideItemProps {
    title?: string
    description: string
    isActive?: boolean
}

const SideItem = ({ title, description, isActive = false }: SideItemProps) => {
    return (
        <div className={`side__item ${isActive ? "active" : ""}`}>
            <p>
                {title ? <span className="keyword">{title}:</span> : null}
                {" " + description}
            </p>
        </div>
    )
}

export default SideItem
