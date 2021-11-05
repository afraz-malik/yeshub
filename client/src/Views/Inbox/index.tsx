
import React, { useState, useEffect } from "react"
import Notification from '../../Shared/Notification/Notification';

import { useParams } from "react-router-dom"

import { DefaultContent } from "../../Controller/Main/ContentWithCommunities"

import { chat } from "../../Helpers/Request/Services/chat/chat"
import { formatTime } from "../../Helpers/Date/time"
import isBaseImg from "../../Helpers/Functions/isBaseImg"
import isFullImageUrl from "../../Helpers/Functions/isFullImageUrl"
import EventBus from "../../Helpers/Request/Services/event-bus"
import { isURL } from "../../Helpers/RegularExpressions/isUrl"
import { userId } from "../../Constants/getUserId"
import ImageUpload from "../../Shared/ImageUploader"
import ChatStorage from '../../Helpers/chatstorage';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner, faPlus} from '@fortawesome/free-solid-svg-icons'
const padding = {
    'padding': '0 2px'
}

const baseurl = `${window.location.protocol}//${process.env.REACT_APP_API_URL}/`
type state = {
    selectedUser: any
    messages: []
    currentMsg: any
    threads: any[]
    paramID: any
    userID: any
    currentImage: any
    isOpen: any
    isActive: any
    archivedThreads: any[]
    activeThreads: any[],
    loading: boolean,
    keywords: string
}
type routeparam = {
    id: any
}

const imageUrl = (image: string) => {
    if (isBaseImg(image)) {
        return image
    }

    if (isFullImageUrl(image)) {
        return image
    }

    return baseurl + image
}
const btnPrimaryStyle = {
    width: "50%",
    borderRadius: '0px',
    borderTopLeftRadius: '10px'
}
const btnDangerStyle = {
    width: "50%",
    borderRadius: '0px',
    borderTopRightRadius: '10px'
}

const ht = {
    height: "68px",
}

const spliceArray = (array: any[], obj: any) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].conversationID == obj.conversationID) {
            array.splice(i, 1)
            break
        }
    }

    return array
}

const messagesEnd = React.createRef<any>()
const messagesRef = React.createRef<any>()
class ModInbox extends React.Component<any, state, routeparam> {
    constructor(props: any) {
        super(props)

        this.state = {
            selectedUser: {},
            messages: [],
            currentMsg: "",
            threads: [],
            archivedThreads: [],
            activeThreads: [],
            paramID: this.props.match.params.id,
            currentImage: "",
            userID: JSON.parse(localStorage.getItem("STORAGE_USER_PROFILE") || "{}")._id || "",
            isActive: true,
            isOpen: false,
            loading: false,
            keywords: ""
        }

        // this.state.selectedUser = this.state.users[0];
        // this.setState({selectedUser: this.state.users[0]})
        this.selectUser = this.selectUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.onChildImageChange = this.onChildImageChange.bind(this)
        this.onImageClosed = this.onImageClosed.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.toggle = this.toggle.bind(this)
        this.activateThreads = this.activateThreads.bind(this)
        this.archive = this.archive.bind(this)
        this.unarchive = this.unarchive.bind(this)
        this.clearCounter = this.clearCounter.bind(this)
        this.onKeywordChange = this.onKeywordChange.bind(this);
    }

    style = {
        height: "350px",
        border: "1px solid gray",
        padding: "10px",
        overflow: "auto",
    }

    clearCounter =() => {
        let threads = this.state.threads;
        for(let i=0; i<threads.length; i++) {
            if(threads[i].conversationID === this.state.selectedUser.conversationID) {
                threads[i].counter = 0;
                threads[i].seen = true;
                break;
            }
        }
        this.setState({threads: threads});
    }

    toggle = () => {
        console.log("toggleing ...")
        this.setState({ isOpen: !this.state.isOpen })
    }

    unarchive = (conID: string) => {
        chat.unArchiveChat(conID).then(
            res => {
                Notification(res.data.message?res.data.message : "Conversation Unarchived successfully", "success");
                this.state.activeThreads.push(this.state.selectedUser)
                let resp = spliceArray(this.state.archivedThreads, this.state.selectedUser)
                this.setState({ archivedThreads: resp })
                this.setState({
                    selectedUser: this.state.archivedThreads[0] || {},
                    threads: this.state.archivedThreads,
                })
                if (!this.state.selectedUser.conversationID) {
                    this.setState({ messages: [] })
                } else {
                    this.getMessages(this.state.selectedUser.conversationID)
                }
            },
            error => console.log(error.message)
        )
    }

    archive = (conID: string) => {
        chat.archiveChat(conID).then(
            res => {
                // TODO add toaster
                Notification(res.data.message ? res.data.message : "Conversation Archived Successfully", "success")
                this.state.archivedThreads.push(this.state.selectedUser)
                let resp = spliceArray(this.state.activeThreads, this.state.selectedUser)
                this.setState({ activeThreads: resp })
                this.setState({ selectedUser: this.state.activeThreads[0] || {}, threads: this.state.activeThreads })
                if (!this.state.selectedUser.conversationID) {
                    this.setState({ messages: [] })
                } else {
                    this.getMessages(this.state.selectedUser.conversationID)
                }
                console.log("conversation ID ", conID)
            },
            error => console.log(error.message)
        )
    }

    msgSeen = () => {
        // call back end api
        this.state.selectedUser.counts = 0;
        chat.seenMessage(this.state.selectedUser.conversationID);        
        EventBus.dispatch("msg-seen", { detail: null })
    }

    scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }

    selectUser = (user: any) => {
        console.log("user is selected", user)
        this.setState({ selectedUser: user })
        if(ChatStorage.hasMessages(user.conversationID)) {
            this.setState({messages: ChatStorage.getMessages(user.conversationID)}, () => {
                this.scrollToBottom();
            });
            
            return;
        }

        chat.getMessagesByConversation(user.conversationID).then(res => {
            console.log(res.data)
            this.setState({ messages: res.data })
            ChatStorage.setMessages(user.conversationID, res.data);
            this.scrollToBottom()
        })
    }

    getMessages(id: any) {
        if (!id || id == "") this.setState({ messages: [] });

        if(ChatStorage.hasMessages(id)) {
            this.setState({messages: ChatStorage.getMessages(id)});
            this.scrollToBottom();
            return;
        }

        chat.getMessagesByConversation(id).then(res => {
            console.log(res.data)
            this.setState({ messages: res.data })
            ChatStorage.setMessages(id, res.data);
            this.scrollToBottom()
        })
    }

    onKeyUp(event: any) {
        event.preventDefault()
        if (event.keyCode === 13 || event.charCode === 13) {
            this.sendMessage(event)
        }
    }

    sendMessage = (e: any) => {
        e.preventDefault()
        let msg: { message: string; image?: string } = { message: this.state.currentMsg }
        if (this.state.currentImage) {
            msg["image"] = this.state.currentImage
        }
        chat.sendToConversation(this.state.selectedUser.conversationID, msg).then(
            res => {
                console.log("message sent ", res.data);
                ChatStorage.addNewMessage(res.data.data.conversationID, res.data.data);
                this.setState({messages: ChatStorage.getMessages(res.data.data.conversationID)});
                this.scrollToBottom()
                // this.getMessages(this.state.selectedUser.conversationID)
            },
            error => console.log(error)
        )
        this.setState({ currentMsg: "" })
        this.setState({ currentImage: "" })
        
        EventBus.dispatch("message-sent", {})
    }

    handleChange = (e: any) => {
        this.setState({ currentMsg: e.target.value })
    }

    onImageClosed = (data: string) => this.setState({ currentImage: data })

    onChildImageChange = (data: any) => {
        this.setState({ currentImage: data })
    }

    schedule = () => {
        const interval = setInterval(() => this.getMessages(this.state.selectedUser.conversationID), 5000)
    }
 
    getUserThreads = () => {
        let threads = [];
        let archived = [];
        let _threads = ChatStorage.getAllThreads();
        console.log(_threads);
        for(let key in _threads) {
            threads.push(..._threads[key].data);
            archived.push(..._threads[key].archived);
        }
        console.log('threads', threads);
        console.log('archived', archived);

        this.setState({threads: threads});
        this.setState({activeThreads: threads});
        this.setState({ archivedThreads: archived })
        this.setState({ selectedUser: threads[0] || {} })
        this.getMessages(threads[0].conversationID || "");

        /*if(!ChatStorage.hasThread('user')) {
            chat.getAllThreads().then(
                res => {
                    let threads = res.data.data;
                    
                    threads.forEach((thread :any)=> {thread.counter = 0; thread.seen = true});
                    // this.setState({ threads: res.data.data })
                    this.setState({ threads: threads })
                    this.setState({ activeThreads: res.data.data })
                    this.setState({ archivedThreads: res.data.archived })
                    this.setState({ selectedUser: res.data.data[0] || {} })
                    
                    this.getMessages(res.data?.data[0]?.conversationID || "")
                    console.log(threads);
                },
                error => console.log("error", error)
            )
        } else {
            let active_threads = ChatStorage.getThreads('user-threads');
            let archive_threads = ChatStorage.getThreads('user-threads');
                    
            active_threads.forEach((thread :any)=> {thread.counter = 0; thread.seen = true});
            // this.setState({ threads: res.data.data })
            this.setState({ threads: active_threads })
            this.setState({ activeThreads: active_threads })
            this.setState({ archivedThreads: archive_threads })
            this.setState({ selectedUser: active_threads[0] || {} })
            
            this.getMessages(active_threads[0]?.conversationID || "")
            console.log(active_threads);
        }*/
    }

    updateThread = (ID: string, msg?: any) => {
        console.log(msg);
        let threads = this.state.threads
        for (let i = 0; i < threads.length; i++) {
            if (threads[i].conversationID == ID) {
                threads[i].seen = false;
                threads[i].counts += 1;
                                
                threads[i].lastMessage = msg.message;
                ChatStorage.addNewMessage(ID, msg);
                break
            }
        }

        if(this.state.selectedUser.conversationID == ID) {
            this.setState({messages: ChatStorage.getMessages(ID)});
            this.scrollToBottom();
        }

        this.setState({ threads: threads })
        // this.setState({ selectedUser: threads[0] })
        // this.getMessages(ID)
    }

    activateThreads = () => {
        if (!this.state.isActive) {
            this.setState({
                threads: this.state.activeThreads,
            })

            this.setState({
                isActive: true,
            })

            this.setState({
                selectedUser: this.state.activeThreads[0] || {},
            })

            setTimeout(() => {
                if (this.state.selectedUser.conversationID) {
                    this.getMessages(this.state.selectedUser.conversationID)
                } else {
                    this.setState({ messages: [] })
                }
            }, 100)
        }
    }

    toggleThreads = (e: any) => {
        // e.preventDefault();

        if (this.state.isActive) {
            this.setState({ isActive: false })
            this.setState({ threads: this.state.archivedThreads })
            {
                this.setState({ selectedUser: this.state.archivedThreads[0] || {} })

                setTimeout(() => {
                    if (this.state.selectedUser.conversationID) {
                        this.getMessages(this.state.selectedUser.conversationID)
                    } else {
                        this.setState({ messages: [] })
                    }
                }, 0)
            }
        }
    }

    onKeywordChange = (event: any) => {
        let key = event.target.value;
        this.setState({keywords: key});
        let _threads = this.state.threads;
        let filtered = [];
        if(key !== undefined || key != null || key != " " || key != "") {
            filtered = _threads.filter((item: any) => {
                return (
                    item.user?.userName.toLowerCase().includes(key.toLowerCase()) ||
                    item.community?.name.toLowerCase().includes(key.toLowerCase()) ||
                    item?.name.toLowerCase().includes(key.toLowerCase())
                );
            })
        }

        this.setState({activeThreads: filtered});
    }

    componentDidMount = () => {
        console.log('this is user inbox', this.state.paramID);
        EventBus.on("message-" + this.state.userID, (data: any) => {
            console.log('new message', data);
            this.updateThread(data.detail.conversationID, data.detail);
        })

        EventBus.on("com-message", (data: any) => {
            // for this community message
            this.updateThread(data.detail.conversationID, data.detail)
        })

        document.body.addEventListener("click", () => {
            console.log("clicked window")
            if (this.state.isOpen) {
                setTimeout(() => {
                    this.setState({ isOpen: false })
                }, 200)
            }
        })
        this.setState({loading: true});
        if(!ChatStorage.isLoading()) {
            this.getUserThreads()
            this.setState({loading: false})
        } else {
            setTimeout(() => {
                this.setState({loading: false});
                this.getUserThreads();
            }, 7000);
        }
        
    }

    componentWillUnmount = () => {
        document.body.removeEventListener("click", () => {})
    }

    render() {
        
        return (
            
            <DefaultContent>
                    
                <div className="container" style={padding}>
                
                    <div className="row">
                    
                        <div className="col-md-4" style={padding}>
                            <div className="messages--list custom--bg">
                                <div className="flex">
                                    <button
                                        onClick={this.activateThreads}
                                        style={btnPrimaryStyle}
                                        className={`btn btn-outline-primary ${this.state.isActive ? "active" : ""}`}
                                    >
                                        Active
                                    </button>
                                    <button
                                        onClick={this.toggleThreads}
                                        style={btnDangerStyle}
                                        className={`btn btn-outline-danger ${!this.state.isActive ? "active" : ""}`}
                                    >
                                        Archived
                                    </button>
                                </div>
                                <input type="text" placeholder="search" onChange={this.onKeywordChange} value={this.state.keywords} className="form-control"/>

                                {this.state.activeThreads.map((thread, index) => {
                                    return (
                                        <div
                                            onClick={() => this.selectUser(thread)}
                                            className={`sidebar--item ${
                                                thread.conversationID == this.state.selectedUser.conversationID
                                                    ? "active"
                                                    : ""
                                            }`}
                                        >
                                            <div className="d-flex align-items-center">
                                                <img className="user--img" src={imageUrl(thread.logo)} alt={""} />
                                                <p className={thread.counts > 0 ? "text--bold" : ""}>
                                                    {thread.name} {thread.counts > 0 ? <span className="badge badge-primary pull-right">{thread.counts}</span> : ""}
                                                </p>
                                            </div>
                                            <p className="last--message">
                                                {thread.lastMessage
                                                    ? thread.lastMessage.slice(0, 6) +
                                                      (thread.lastMessage.length > 10 ? "..." : "")
                                                    : "No Message"}
                                                {/* <small className="float-right">{user.lastTime ? formattedTime(user.lastTime) : ""}</small> */}
                                            </p>
                                        </div>
                                    )
                                    // <li key={ index }  onClick={() => this.selectUser(thread)}> {thread.name}</li>;
                                })}
                            </div>
                        </div>
                        <div className="col-md-8" style={padding}>
                        {
                            this.state.loading && (
                                <div className={"d-flex pos"}>
                                    <div className="mr-auto ml-auto">
                                        <span className="custom--badge badge-success">Loading ...</span>
                                    </div>
                                </div>
                            )
                        }
                            <div className="custom--bg message--details">
                                <div className="d-flex justify-content-between border-bottom mb-2 pb-2">
                                    <div className="message--header d-flex align-items-center">
                                        <img
                                            className="user--img"
                                            src={
                                                this.state.selectedUser?.logo
                                                    ? imageUrl(this.state.selectedUser.logo)
                                                    : ""
                                            }
                                        />
                                        <p className="user--name mb-0 ml-1">
                                            {
                                                this.state.selectedUser.isMod 
                                                ? <a href={`/community/details/${this.state.selectedUser._id || this.state.paramID}`}><strong>{this.state.selectedUser?.name}</strong></a>
                                                : <strong>{this.state.selectedUser?.name}</strong>
                                            }
                                            
                                        </p>
                                        {!this.state.selectedUser.name ? (
                                            <p className="user--name mb-0 ml-1">
                                                <strong>No Threads Available</strong>
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="dots" onClick={this.toggle}>
                                        <div className="dots">
                                            <div className="dot"></div>
                                            <div className="dot"></div>
                                            <div className="dot"></div>
                                        </div>
                                        {this.state.isOpen && this.state.selectedUser.conversationID ? (
                                            <div className="dropdown--archive">
                                                {this.state.isActive ? (
                                                    <span
                                                        onClick={() =>
                                                            this.archive(this.state.selectedUser.conversationID)
                                                        }
                                                    >
                                                        Archive
                                                    </span>
                                                ) : (
                                                    <span
                                                        onClick={() =>
                                                            this.unarchive(this.state.selectedUser.conversationID)
                                                        }
                                                    >
                                                        unarchive
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                
                                <div className="overflow" ref={messagesRef}>
                             
                                    {!this.state.messages.length
                                        ? "No Message Found"
                                        : this.state?.messages?.map((message: any, index: any) => {
                                              return (
                                                  <div
                                                      className={`message--item-container d-flex ${
                                                          !message.from ? "welcome-message" : ""
                                                      }  ${userId == message.from?._id ? "received" : ""}`}
                                                  >
                                                      <div className="message--item d-flex flex-nowrap ">
                                                          {!message.from ? (
                                                              ""
                                                          ) : (
                                                              <img
                                                                  src={
                                                                      message.from?.userImage
                                                                          ? imageUrl(message?.from?.userImage)
                                                                          : ""
                                                                  }
                                                                  alt=""
                                                                  className="user--img"
                                                              />
                                                          )}
                                                          <div className="message wordwrap">
                                                              <p className={`${!message.from ? "welcome" : "text"}`}>
                                                                  {isURL(message.message) ? (
                                                                      <a
                                                                          href={message.message}
                                                                          className={"message-link"}
                                                                          target={"_blank"}
                                                                          rel={"noopener noreferrer"}
                                                                      >
                                                                          {message.message}
                                                                      </a>
                                                                  ) : (
                                                                      message.message
                                                                  )}

                                                                  {!message.image ? (
                                                                      ""
                                                                  ) : (
                                                                      <img
                                                                          className="message--img"
                                                                          src={baseurl + message.image}
                                                                      />
                                                                  )}
                                                              </p>
                                                              {message.seen && (
                                                                  <small className="text-muted">&#10003; seen</small>
                                                              )}
                                                              <span className="time">
                                                                  {formatTime(message.createdAt)}
                                                              </span>
                                                          </div>
                                                      </div>
                                                  </div>
                                              )
                                          })}
                                    <form>
                                        <div className="message--input">
                                            <div className="flex">
                                                <ImageUpload
                                                    onImageClosed={this.onImageClosed}
                                                    onSentMessage={this.sendMessage}
                                                    onImageChange={this.onChildImageChange}
                                                    imageUploadStarts={() => {}}
                                                />
                                                <textarea
                                                    style={ht}
                                                    onKeyUp={this.onKeyUp}
                                                    name="message"
                                                    className="form-control h-40"
                                                    onFocus={this.msgSeen}
                                                    value={this.state.currentMsg}
                                                    onChange={this.handleChange}
                                                    onFocusCapture={this.clearCounter}
                                                ></textarea>
                                                <button className="btn send--btn" onClick={this.sendMessage}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="39.881"
                                                        height="34.183"
                                                        viewBox="0 0 39.881 34.183"
                                                    >
                                                        <g transform="translate(0 0)">
                                                            <g transform="translate(0 0)">
                                                                <path
                                                                    fill="#243c4b"
                                                                    d="M.019,32,0,45.294l28.486,3.8L0,52.89.019,66.183,39.881,49.092Z"
                                                                    transform="translate(0 -32)"
                                                                />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultContent>
        )
    }
}

export default ModInbox;
