import React, { useEffect,setState } from "react";
import { CardBody, Card, CardHeader, Row, Col, CardTitle, Input } from "reactstrap";
import MessagesSidebar from "./MessagesSidebar";
import MessageDetails from "./MessageDetails";
import { Route, Redirect } from "react-router-dom";
import { useState } from "react";
import CreateNewMessage from "./NewMessage";
import { chat } from "../../api/chat";
import isBaseEncoded from '../../helper/isBaseEncoded';
import isFullUrl from '../../helper/isFullUrl';
import { SEND_NEW_MESSAGE } from "../../variables/events";
import toImageUrl from '../../helper/toImageUrl';
import MessagesSidebarItem from './MessagesSidebarItem';
import MessageHeader from './MessageHeader';
import MessageItem from './MessageItem';
import SendMessage from './SendMessage';
import ChatStorage from '../../helper/chatStorage';
import EventBus from '../../api/event-but';

const baseurl = `${window.location.protocol}//${process.env.REACT_APP_API_URL}/`;
const btnPrimaryStyle = {
    width: "50%",
    borderRadius: "0px",
    borderTopLeftRadius: "10px",
    margin: "0px"
}

const btnDangerStyle = {
    width: "50%",
    borderRadius: "0px",
    borderTopRightRadius: "10px",
    margin: "0px"
}

const style = {
    padding: "20px"
}

const setImage = (thread) => {

}

const imageUrl = (image ) => {
    if(isBaseEncoded(image)) {
      return image;
    }
  
    if(isFullUrl(image)) {
      return image;
    }
  
    return baseurl + image;
}

const messagesEnd = React.createRef();
const userID = "5ea5bfe037cf27a84f9d8b87";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            keyword: "",
            sidebarUsers: [],
            archivedUsers: [],
            activeUsers: [],
            allUsers: [],
            isActive: true,
            messages:[],
            currentMsg: "",
            count: 0,
            image: "",
            message: "",
            selected: {}
        }

        this.onArchived = this.onArchived.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.onMessageType = this.onMessageType.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onSidebarItemClick = this.onSidebarItemClick.bind(this);
        this.onUnarchived = this.onUnarchived.bind(this);
        this.selectActiveUsers = this.selectActiveUsers.bind(this);
        this.selectArchiveUsers = this.selectArchiveUsers.bind(this);
        this.getThreads = this.getThreads.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.updateMsgsCount = this.updateMsgsCount.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onImageClosed = this.onImageClosed.bind(this);
        this.onImageUploadStarts = this.onImageUploadStarts.bind(this);

    }


    getMessages =  (convId) => {
        chat.getByConversationID(convId).then((res) => {
            console.log(convId, res.data);
            ChatStorage.setMessages(convId, res.data);
            this.setState({messages: res.data});
            this.scrollToBottom();
        });
    }
    
    onKeywordChange = (e) => {
        // setKeyword(e.target.value);
        this.setState({keyword: e.target.value});
        let users = JSON.parse(JSON.stringify(this.state.allUsers));
        let res = users;
        if(this.state.keyword != undefined || this.state.key != null || this.state.length == 0 ) {
            res = users.filter((item) => {
                return (
                    item.user?.userName.toLowerCase().includes(this.state.keyword.toLowerCase()) ||
                    item.community?.name.toLowerCase().includes(this.state.keyword.toLowerCase())
                );
            });
        }
        

        console.log(this.activeUsers)

        this.setState({activeUsers: res});

    };

    onArchived = (data) => {
        console.log('onarchived', data);
        let temp;
        let allthreads = this.state.allUsers;
        for(let i = 0; i<allthreads.length; i++) {
            if (allthreads[i].conversationID == data) {
                temp = allthreads[i];
                allthreads.splice(i, 1);
                break;
            }
        }
        this.setState({activeUsers: allthreads, allUsers: allthreads, selected: allthreads[0]});

        let archived = this.state.archivedUsers;
        archived.unshift(temp);
        this.setState({archivedUsers: archived});

    }

    onUnarchived = (data) => {
        console.log('on unarchived', data);
        // remove from archive
        // push in active
        let temp;
        let archiveThreads = this.state.archivedUsers;
        for(let i = 0; i<archiveThreads.length; i++) {
            if (archiveThreads[i].conversationID == data) {
                console.log(archiveThreads[i], 'found');
                temp = archiveThreads[i];
                console.log(archiveThreads.length);
                archiveThreads.splice(i, 1);
                console.log(archiveThreads.length);
                break;
            }
        }
        this.setState({activeUsers: archiveThreads, archivedUsers: archiveThreads, selected: archiveThreads[0]});
        let active_users = this.state.allUsers;
        console.log(active_users);
        active_users.unshift(temp);
        setState({allUsers: active_users});
        
    }
    
    updateMsgsCount = (data) => {
        
        ChatStorage.addNewMessage(data.conversationID, data);
        console.log('selected this', this.state.selected);
        this.state.activeUsers.map(item => item.conversationID == data.conversationID && (item.lastMessage = data.message) && (item.counts++))
        
        let msgs = ChatStorage.getMessages(this.state.selected.conversationID) || [];
        this.setState({messages: msgs});
        this.scrollToBottom();
    }


    getThreads = () => {
        chat.messageSideBarUsers().then((res) => {
            ChatStorage.addThreads('admin', res);
            this.setState({allUsers: res.data, selected: res.data[0], archivedUsers: res.archived, activeUsers: res.data})
            this.getMessages(res.data[0].conversationID);
            this.scrollToBottom();
        });
    };

    selectActiveUsers = () => {
        this.setState({activeUsers: this.state.allUsers, isActive: true});
    }

    selectArchiveUsers = () => {
        this.setState({activeUsers: this.state.archivedUsers, isActive: false});
    }

    

    onImageClosed = (e) => {

    }
    
    onImageChange = (data) => {
        this.setState({image: data});
    }

    onImageUploadStarts = (e) => {
    }

    onSidebarItemClick = (thread) => {
        this.setState({selected: thread});
        this.getMessages(thread.conversationID);
    }

    scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    };

    onMessageType = (e) => {
        this.setState({message: e.target.value});
    };

    onSend = (e) => {
        e.preventDefault();
        let msg = {message: this.state.message};
        if(this.state.image) {
            msg.image = this.state.image;
        }
        chat.messageByConversationID(this.state.selected.conversationID, msg).then((res) => {
            ChatStorage.addNewMessage(this.state.selected.conversationID, res.data);
            let msgs = ChatStorage.getMessages(this.state.selected.conversationID);
            this.setState({messages:msgs, message: ""});
            EventBus.dispatch('message-sent', {});
            this.scrollToBottom();
            // setMessage("");
        });
    };

    onFocus = () => {
        if(this.state.selected.counts > 0) {
            chat.markedAsSeen(this.state.selected.conversationID).then(res => {
                let _users = this.state.activeUsers;
                for(let i = 0; i<_users.length; i++) {
                    if(_users[i].conversationID == this.state.selected.conversationID) {
                        _users[i].counts = 0;
                    }
                }    
    
                this.setState({activeUsers: _users})
            });
        
        }
    }
        
    onKeyUp = (e) => {
        e.preventDefault();
        if (e.keyCode === 13 || e.charCode === 13) {
            // EventBus.dispatch('message-sent', {});
            let msg = {message: this.state.message};
            if(this.state.image) {
                msg.image = this.state.image;
            }
            chat.messageByConversationID(this.state.selected.conversationID, msg).then((res) => {
                ChatStorage.addNewMessage(this.state.selected.conversationID, res.data);
                let msgs = ChatStorage.getMessages(this.state.selected.conversationID);
                this.setState({messages: msgs, message: ""});
                this.scrollToBottom();
                // setMessage("");
            });
        }
    };

    componentDidMount() {
        this.getThreads();
        let self = this;
        document.addEventListener('new-msg', function(data) {
            if(data.detail.from._id != userID) {
               console.log(data.detail);
                console.log(this);
                self.updateMsgsCount(data.detail); 
            }
            
        })
    }
    componentWillUnmount() {
        document.removeEventListener('new-msg', () =>{});
    }
    
render() {
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card className="messages">
                        <CardHeader className="d-flex justify-content-between">
                            <CardTitle tag="h5">Inbox</CardTitle>
                            <div onClick={this.onToggleModal}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30.134"
                                    height="30.134"
                                    viewBox="0 0 30.134 30.134"
                                >
                                    <g transform="translate(0 -0.004)">
                                        <g transform="translate(0 2.156)">
                                            <path
                                                fill="#243c4b"
                                                d="M24.753,47.051a1.076,1.076,0,0,0-1.076,1.076V58.89A1.076,1.076,0,0,1,22.6,59.966H3.229A1.076,1.076,0,0,1,2.152,58.89V37.366a1.076,1.076,0,0,1,1.076-1.076H16.143a1.076,1.076,0,1,0,0-2.152H3.229A3.229,3.229,0,0,0,0,37.366V58.89a3.229,3.229,0,0,0,3.229,3.229H22.6a3.229,3.229,0,0,0,3.229-3.229V48.128A1.076,1.076,0,0,0,24.753,47.051Z"
                                                transform="translate(0 -34.137)"
                                            />
                                        </g>
                                        <g transform="translate(6.458 0.004)">
                                            <g transform="translate(0 0)">
                                                <path
                                                    fill="#243c4b"
                                                    d="M124.879,1.211a4.119,4.119,0,0,0-5.827,0L104.876,15.386a1.088,1.088,0,0,0-.259.421l-2.152,6.457a1.076,1.076,0,0,0,1.02,1.416,1.093,1.093,0,0,0,.34-.055l6.457-2.152a1.077,1.077,0,0,0,.421-.26L124.878,7.037A4.12,4.12,0,0,0,124.879,1.211Z"
                                                    transform="translate(-102.409 -0.004)"
                                                />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={5} lg={4}>
                                    {/* <MessagesSidebar sidebarUsers={sidebarUsers} archivedUsers={archivedUsers} /> */}
                                    <div className="flex">
                                        <button onClick = {() => this.selectActiveUsers()} style={btnPrimaryStyle} className={`btn btn-outline-primary ${this.state.isActive ? "active" : ""}`}>Active</button>
                                        <button onClick = {() => this.selectArchiveUsers()} style={btnDangerStyle} className={`btn btn-outline-archive ${!this.state.isActive ? "active" : ""}`}>Archive</button>
                                    </div>
                                    <div className="messages--list custom--bg">
                                        <Input style={style} type={"text"} placeholder={"Search"} onChange={this.onKeywordChange} value={this.state.keyword} />
                                        {!this.state.activeUsers.length
                                            ? "No User"
                                            : this.state.activeUsers.map((item, idx) => <MessagesSidebarItem selected = {this.state.selected.conversationID} onClick={this.onSidebarItemClick} isArchived={!this.state.isActive} user={item} key={idx} />)}
                                    </div>
                                </Col>
                                <Col md={7} lg={8}>
                                    <div className="custom--bg message--details">
                                        <MessageHeader current={this.state.selected} image={imageUrl(this.state.selected?.community?.logo || this.state.selected?.user?.userImage)} unarchived={this.onUnarchived} archived={this.onArchived} />
                                        <div className={"overflow"}>
                                            {!this.state.messages.length ? (
                                                <h5 align={"center"}>No Message</h5>
                                            ) : (
                                                this.state.messages.map((item, idx) => {
                                                    return <MessageItem archived = {this.onArchived} message={item} key={idx} isReceived={item?.from?._id === userID} />;
                                                })
                                            )}
                                            <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
                                        </div>
                                        <SendMessage onImageUploadStarts = {this.onImageUploadStarts} 
                                                     onImageChange = {this.onImageChange} 
                                                     onImageClosed={this.onImageClosed} 
                                                     onSend={this.onSend} 
                                                     onChange={this.onMessageType} 
                                                     message={this.state.message}
                                                     onFocus={this.onFocus} 
                                                     onKeyUp={this.onKeyUp} />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <CreateNewMessage isOpen={this.state.isOpen} toggle={this.onToggleModal} />
        </div>
    );
  }
};

export default App;
