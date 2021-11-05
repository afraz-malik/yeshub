import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWindowClose } from "@fortawesome/free-solid-svg-icons"
import { HomeApis } from "../../../Helpers/Request/Services/Home/Home"

export interface CovidBannerProps {}

const CovidBanner: React.FC<CovidBannerProps> = () => {
    const [isOpen, toggleBanner] = React.useState(false)
    const [banner, setBanner] = React.useState({
        id: "",
        content: "",
    })

    React.useEffect(() => {
        let ban = localStorage.getItem('banner') || "show";
        HomeApis.getBanner.then(response => {
            if (response.data.data.length > 0) {
                setBanner(response.data.data[0])
                toggleBanner(ban === 'hide' ? false : true);
            }
        })
    }, [])

    const onToggle = () => {
        let ban = localStorage.getItem('banner');
        if(ban == 'show') {
            ban = 'hide';
        } else {
            ban = 'show'
        }

        localStorage.setItem('banner', ban);
        toggleBanner(!isOpen)
    }

    return (
        <div id="covid-banner" className={`covid__banner ${!isOpen ? "d-none" : ""}`}>
            <div className="close__icon" onClick={onToggle}>
                <FontAwesomeIcon icon={faWindowClose} />
            </div>
            <div className="alert text-center">
                <div dangerouslySetInnerHTML={{ __html: banner.content }} />
            </div>
        </div>
    )
}

export default CovidBanner
