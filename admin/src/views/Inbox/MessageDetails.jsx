import React from "react";
import MessageItem from "./MessageItem";
import MessageHeader from "./MessageHeader";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { chat } from "../../api/chat";
import SendMessage from "./SendMessage";
import EventBus from '../../api/event-but';

import {Dropdown, DropdownItem, DropdownToggle} from 'reactstrap';

const userID = "5ea5bfe037cf27a84f9d8b87";
const messagesEnd = React.createRef();
const MessageDetails = ({ users = [], onArchived, onUnarchived }) => {
    const { id, convId } = useParams();
    const [messages, setMessage] = useState([]);
    const [selected, setSelected] = useState({});
    const [message, setMsg] = useState("");
    const [image, setImage] = useState("");
    const getMessages = () => {
        chat.getByConversationID(convId).then((res) => {
            setMessage(res.data);
        });
    };
    useEffect(() => {
        getMessages();
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        if (users.length) {
            const filtered = users.filter((item) => {
                if (!item.user) {
                    return item?.community?._id === id;
                }
                return item?.user?._id === id;
            })[0];

            setSelected(filtered);
        }
    }, [id, users]);

    useEffect(() => {
        const inter = window.setInterval(() => {
            getMessages();
        }, 5000);
        return () => window.clearInterval(inter);
        // eslint-disable-next-line
    }, [id]);

    const onSend = (e) => {
        e.preventDefault();
        EventBus.dispatch('message-sent', {});
        let msg = {message: message};
        if(image) {
            msg.image = image;
        }
        chat.messageByConversationID(convId, msg).then((res) => {
            setMessage([...messages, res.data]);
            setMsg("");
        });
    };

    const onKeyUp = (e) => {
        e.preventDefault();
        if (e.keyCode === 13 || e.charCode === 13) {
            chat.messageByConversationID(convId, {
                message,
            }).then((res) => {
                setMessage([...messages, res.data]);
                setMsg("");
            });
        }
    };

    const onImageClosed = (e) => {

    }
    
    const onImageChange = (data) => {
        setImage(data);
    }

    const onImageUploadStarts = (e) => {
    }

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        return () => scrollToBottom();
    });

    const onMessageType = (e) => {
        setMsg(e.target.value);
    };

    

    return (
        <React.Fragment>
            <MessageHeader current={selected} unarchived={onUnarchived} archived={onArchived} />
            <div className={"overflow"}>
                {!messages.length ? (
                    <h5 align={"center"}>No Message</h5>
                ) : (
                    messages.map((item, idx) => {
                        return <MessageItem archived = {onArchived} message={item} key={idx} isReceived={item?.from?._id === userID} />;
                    })
                )}
                <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
            </div>
            <SendMessage onImageUploadStarts = {onImageUploadStarts} onImageChange = {onImageChange} onImageClosed={onImageClosed} onSend={onSend} onChange={onMessageType} message={message} onKeyUp={onKeyUp} />
        </React.Fragment>
    );
};

export default MessageDetails;
