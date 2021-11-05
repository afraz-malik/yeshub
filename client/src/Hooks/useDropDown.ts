import { useEffect, useState } from "react"

const useDropDown = (selector: string) => {
    const [isOpen, toggle] = useState(false)

    useEffect(() => {
        const toggleDropdown = document.querySelector(selector)

        document.addEventListener("click", () => toggle(() => false))
        toggleDropdown?.addEventListener("click", event => {
            event.stopPropagation()
            toggle(open => !open)
        })
    }, [selector])

    return { isOpen }
}

export default useDropDown
