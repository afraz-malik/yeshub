import React, { FC, useState, useEffect, ChangeEvent, FormEvent, KeyboardEvent } from "react"
import MessageItem from "./MessageItem"
import MessageHeader from "./MessageHeader"
import { ThreadsInterface, CommunityMessages } from "../../Interface/Chat/chat"
import { chat } from "../../Helpers/Request/Services/chat/chat"
import { useParams } from "react-router-dom"
import SendMessage from "./SendMessage"
import {Observable, Subject} from 'rxjs';
import Inbox from './index';
type MessageDetailsProp = {
    users: ThreadsInterface[],
    // state: {
    //     isModerator?: boolean
    //     _id?: string
    // },
    state: any, 
    selectedUser: any
}


const messagesEnd = React.createRef<any>()
const userID = JSON.parse(localStorage.getItem("STORAGE_USER_PROFILE") || "{}")._id || ""


const MessageDetails: FC<MessageDetailsProp> = ({ users = [], state, selectedUser }) => {
    const { id } = useParams()
    const suser$ = new Observable();
    const subject$ = new Subject();
    
    const [messages, setMessage] = useState<CommunityMessages[]>([])
    const [selected, setSelected] = useState<ThreadsInterface>({
        _id: "",
        isAdmin: false,
        name: "",
        logo: "",
        isUser: false,
        isMod: false,
        isEvent: false,
        lastMessage: "",
        lastTime: "",
    })

    const [message, setMsg] = useState("")

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(e.target.value)
    }

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" })
    }

    const getMessages = (id: string) => {

        console.log('state passed to detail', state);

        // if(selectedUser?.isMod) {
        //     chat.getMessageFromCommunity(selectedUser._id).then(res => {
        //         setMessage(res.data.data);
        //     })
        //     return;
        // } else if(selectedUser?.isAdmin) {
        //     chat.getMessagesFromAdmin().then(res => {
        //         setMessage(res.data.data);
        //     })
        //     return;
        // } else if(selectedUser?.isUser) {
        //     chat.getMessagesForCommunityUser(id, selectedUser?._id).then(res => {
        //         setMessage(res.data.data);
        //     })

        //     return;
        // }
        console.log('conversation ID', id);
        chat.getMessagesByConversation(id).then(res => {
            console.log("messages", res.data);
            setMessage(res.data);
            return;
        })
        if (state?.isModerator) {
            chat.getMessagesForCommunityUser(state?._id || "", id).then(res => {
                setMessage(res.data.data)
            })
            return
        }
        if (id === "5ea5bfe037cf27a84f9d8b87") {
            chat.getMessagesFromAdmin().then(res => {
                setMessage(res.data.data)
            })
        } else {
            chat.getMessageFromCommunity(id).then(res => {
                setMessage(res.data.data)
            }) 
        }
    }

    


    useEffect(() => {
        console.log('state testing', state);

        getMessages(id)
        // eslint-disable-next-line
    }, [id])

    const onSend = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (state?.isModerator) {
            chat.modToUser(state?._id || "", { message, to: id }).then(res => {
                setMessage([...messages, res.data.data])
                setMsg("")
            })
            return
        }
        const data = id === "5ea5bfe037cf27a84f9d8b87" ? { message } : { message }
        if (id === "5ea5bfe037cf27a84f9d8b87") {
            chat.sendMessageToAdmin(data).then(res => {
                setMessage([...messages, res.data.data])
                setMsg("")
            })
            return
        }
        chat.sendMessageToMods(id, data).then(res => {
            setMessage([...messages, res.data.data])
            setMsg("")
        })
    }

    const onKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.keyCode === 13 || e.charCode === 13) {
            if (state?.isModerator) {
                chat.modToUser(state?._id || "", { message, to: id }).then(res => {
                    setMessage([...messages, res.data.data])
                    setMsg("")
                })
                return
            }
            const data = id === "5ea5bfe037cf27a84f9d8b87" ? { message } : { message }
            if (id === "5ea5bfe037cf27a84f9d8b87") {
                chat.sendMessageToAdmin(data).then(res => {
                    setMessage([...messages, res.data.data])
                    setMsg("")
                })
                return
            }
            chat.sendMessageToMods(id, data).then(res => {
                setMessage([...messages, res.data.data])
                setMsg("")
            })
        }
    }

    useEffect(() => {
        let filtered
        if (id === "5ea5bfe037cf27a84f9d8b87") {
            filtered = users.filter(item => item.name === "Admin")[0]
            setSelected(filtered)
            return
        }
        filtered = users.filter(item => item._id === id)[0]
        setSelected(filtered)
    }, [id, users])

    useEffect(() => {
        const inter = window.setInterval(getMessages, 5000, id)
        return () => window.clearInterval(inter)
        // eslint-disable-next-line
    }, [id, messages])

    useEffect(() => {
        scrollToBottom()
        return () => scrollToBottom()
    }, [id, messages])

    return (
        <React.Fragment>
            <MessageHeader user={selected} />
            {}
            <div className="overflow">
                {!messages.length
                    ? "No Message Found"
                    : messages.map(item => {
                          return <MessageItem isReceived={item.from._id === userID} key={item._id} message={item} />
                      })}
                <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
            </div>
            <SendMessage onSend={onSend} onMessageType={onChange} message={message} onKeyUp={onKeyUp} />
        </React.Fragment>
    )
}

export default MessageDetails
