import * as React from "react"
import { Route, useLocation, Redirect } from "react-router-dom"
import {NavLink} from 'react-router-dom'
import { DefaultContent } from "../../Controller/Main/ContentWithCommunities"
import MessagesSidebar from "./MessagesSidebar"
import MessageDetails from "./MessageDetails"
import { ThreadsInterface } from "../../Interface/Chat/chat"
import { chat } from "../../Helpers/Request/Services/chat/chat"

export interface InboxProps {}

type stateType = { isModerator: boolean; _id: string }

const Inbox: React.SFC<InboxProps> = () => {
    const { state } = useLocation<stateType>()
    const [threads, setThreads] = React.useState<any[]>([])
    const [count, setCount] = React.useState(0)
    const [selectedUser, setSelectedUser] = React.useState<any>()
    const [currentState] = React.useState<stateType>(
        state || {
            isModerator: false,
            _id: "",
        }
    )

    
    const testSelect = (user:any) => {
        console.log('selected new user');
        setSelectedUser(user);
    }
    const getThread = () => {
        if (currentState.isModerator) {
            console.log('getting threads for moderator');
            chat.getThreadsForMods(state?._id).then(res => {
                console.log(res.data);
                setThreads(res.data)
                setSelectedUser(res.data[0])
                setCount(1)
            })
            return
        }
        chat.getAllThreads().then(res => {
            setThreads(res.data.data)
            setSelectedUser(res.data[0])
            if (count !== 1) setCount(1)
        })
    }
    React.useEffect(() => {
        console.log('current state', currentState);
        console.log('state', state);
        
        getThread();
        console.log(count);
    }, [])

    
    React.useEffect(() => {
        const inter = window.setInterval(getThread, 15000)
        return () => window.clearInterval(inter)
    }, [])

    if (threads.length && count < 1) {
        return <Redirect to={`/inbox/${threads[0].conversationID || "5ea5bfe037cf27a84f9d8b87"}`} />
    }

    return (
        <DefaultContent>
            <div className="row">
                <div className="col-sm-5 col-md-4 col-lg-3">
                <div className="messages--list custom--bg">
                    {/* <input
                        type={"text"}
                        className={"form-control"}
                        placeholder={"Search"}
                        onChange={onSearch}
                        value={keyword}
                    /> */}
                    {threads.map((user, idx) => 
                    
                        <NavLink
                        activeClassName="active"
                        to={{ 
                            pathname: '/inbox/'+user.conversationID, 
                            state: user 
                          }} 
                         className="sidebar--item-link"
                    >
                        
                        <div className="sidebar--item">
                            <div className="d-flex align-items-center">
                                <img className="user--img" src={user.logo} alt={"N/A"} />
                                <h4 className="user--name">{user.name}</h4>
                            </div>
                            <p className="last--message">
                                {user.lastMessage
                                    ? user.lastMessage.slice(0, 6) + (user.lastMessage.length > 10 ? "..." : "")
                                    : "No Message"}
                                {/* <small className="float-right">{user.lastTime ? formattedTime(user.lastTime) : ""}</small> */}
                            </p>
                        </div>
                     </NavLink> 
                    
                    )}
                </div>
                </div>
                <div className="col-sm-7 col-md-8 col-lg-9">
                    <div className="custom--bg message--details">
                        <Route
                            path={`/inbox/:id`}
                            render={() => <MessageDetails users={threads} selectedUser={selectedUser} state={currentState} />}
                        />
                    </div>
                </div>
            </div>
        </DefaultContent>
    )
}

export default Inbox
