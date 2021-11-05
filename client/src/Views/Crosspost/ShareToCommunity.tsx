import * as React from "react"
import { Switch, Route, Link, useLocation, useParams, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSync } from "@fortawesome/free-solid-svg-icons"

import { DefaultContent } from "../../Controller/Main/ContentWithCommunities"
import FormHeader from "../../Container/Top/FormHeader"
import SelectCommunity from "../../Components/SelectElement/SelectCommunity"
import { ShareType, ShareItem } from "../../Shared/HelperBtn/SharedBtn"

import IEvent from "../../Models/User/IEvent"
import { FeedType } from "../../Interface/Home/FeedsInterface"
import eventApi from "./../../Helpers/Request/Services/Event/Event"
import postApi from "./../../Helpers/Request/Services/Post/Post"
import shareApi from "../../Helpers/Request/Services/Share"
import Notification from "../../Shared/Notification/Notification"

const ShareEvent = React.lazy(() => import("./Event"))
const SharePost = React.lazy(() => import("./Post"))

export interface ShareToCommunityProps {}

const ShareToCommunity: React.SFC<ShareToCommunityProps> = () => {
    const { state } = useLocation<ShareItem>()
    const [item, setItem] = React.useState<ShareItem>(state)
    const { type, id } = useParams<{ type: ShareType; id: string }>()
    const [selectedCommunity, setSelected] = React.useState("")
    const { goBack } = useHistory()

    React.useEffect(() => {
        if (!state) {
            if (type === "event") {
                eventApi.fetchById(id).then(response => {
                    setItem(response.data.data)
                })
            } else if (type === "post") {
                postApi.detailsById(id).then(response => {
                    setItem(response.data.data)
                })
            }
        }
    }, [id, type, state])

    const onShareToCommunity = () => {
        alert(type)
        if (type === "event") {
            shareApi.shareEvent(selectedCommunity, (item as IEvent).parentID, item._id).then(response => {
                Notification(response.data.message, "success")
                goBack()
            })
        }
    }

    const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value)
    }

    return (
        <DefaultContent
            extraComponent={
                <>
                    <div className="mc-border">
                        <div className="select-community-rules">
                            <div className="scr-wrap position-relative">
                                <span className="community-refresh-icon">
                                    <FontAwesomeIcon icon={faSync} />
                                </span>
                                <span className="scr-link">Select a Community to load their rules</span>
                            </div>
                        </div>
                    </div>
                    <p className="content-policy-note py-4">
                        Please be mindful of YES!HUB
                        <Link to="/">content policy</Link>
                    </p>
                </>
            }
        >
            <div className="cp-wrap">
                <FormHeader title="Share in Community" />

                <div className="form-group mt-1">
                    <SelectCommunity onSelect={onSelect} selectedCommunity={selectedCommunity} />
                </div>
                <div className="cp-form">
                    <Switch>
                        <Route render={() => <ShareEvent event={state as IEvent} />} path="/crosspost/event/:id" />
                        <Route render={() => <SharePost post={state as FeedType} />} path="/crosspost/post/:id" />
                    </Switch>
                    <div className="form-group text-right mt-4">
                        <button onClick={onShareToCommunity} type="button" className="btn btn-signup">
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </DefaultContent>
    )
}

export default ShareToCommunity
