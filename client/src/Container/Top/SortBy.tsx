import React, { FC, MouseEvent, useState } from "react"

type SortByInterface = {
    hideLable?: boolean
    value?: string
    onValueChange?: any
}

const SortBy: FC<SortByInterface> = ({ hideLable, value, onValueChange }) => {
    const [isSortOpen, setIsSortOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState(value || "newest")

    let onOpen = () => {
        setIsSortOpen(state => !state)
    }

    const onSelectedChange = (e: MouseEvent<HTMLElement>) => {
        setSelected(e.currentTarget.id)

        if (onValueChange) {
            onValueChange(e.currentTarget.id)
        }
    }

    return (
        <div className="sort-by">
            {!hideLable && <span className="sort-text">Sort By:</span>}
            <div className="select_wrap ml-3" id="selectwrap" onClick={onOpen}>
                <ul className="default_option list-unstyled" id="defaultOption">
                    <li>
                        <div className="option trending">
                            <p>{selected}</p>
                        </div>
                    </li>
                </ul>
                <ul className={`select_ul list-unstyled ${isSortOpen ? "active" : null}`} id="select_ul">
                    <li onClick={onSelectedChange} id={"newest"}>
                        <div className="option new">
                            <p>New</p>
                        </div>
                    </li>
                    <li onClick={onSelectedChange} id={"trending"}>
                        <div className="option trending">
                            <p>Trending</p>
                        </div>
                    </li>

                    <li onClick={onSelectedChange} id={"hot"}>
                        <div className="option hot">
                            <p>Hot</p>
                        </div>
                    </li>
                    {/* <li onClick={onSelectedChange} id={"Best"}>
                        <div className="option best">
                            <p>Best</p>
                        </div>
                    </li> */}
                </ul>
            </div>
        </div>
    )
}

export default SortBy
