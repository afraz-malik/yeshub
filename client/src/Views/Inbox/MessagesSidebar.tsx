import * as React from "react"
import MessagesSidebarItem from "./MessagesSidebarItem"
import { ThreadsInterface } from "../../Interface/Chat/chat"

type sideBarProps = {
    threads: ThreadsInterface[]
}

const MessagesSidebar: React.FC<sideBarProps> = ({ threads = [] }) => {
    const [keyword, setKeyword] = React.useState("")
    const [search, setSearch] = React.useState(threads)

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    React.useEffect(() => {
        if (!keyword) {
            setSearch(threads)
        } else {
            const filtered = threads.filter(item => {
                return item.name.toLocaleLowerCase().includes(keyword.toLowerCase())
            })
            setSearch(filtered)
        }
    }, [threads, keyword])
    return (
        <div className="messages--list custom--bg">
            <input
                type={"text"}
                className={"form-control"}
                placeholder={"Search"}
                onChange={onSearch}
                value={keyword}
            />
            {!search.length ? "No Thread" : search.map((item, idx) => <MessagesSidebarItem user={item} key={idx} />)}
        </div>
    )
}

export default MessagesSidebar
