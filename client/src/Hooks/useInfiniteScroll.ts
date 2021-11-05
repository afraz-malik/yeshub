import { useState, useEffect } from "react"

let timeOut: null | NodeJS.Timeout = null

const useInfiniteScroll = (currentPage = 1) => {
    const [page, setPage] = useState<number>(currentPage)

    const pageIncreamentOnScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && timeOut === null) {
            timeOut = setTimeout(() => {
                setPage(prevValue => prevValue + 1)
                timeOut = null
            }, 2000)
        }
    }

    useEffect(() => {
        document.addEventListener("scroll", pageIncreamentOnScroll)
        return () => document.removeEventListener("scroll", pageIncreamentOnScroll)
        // eslint-disable-next-line
    }, [page])

    return { page }
}

export default useInfiniteScroll
