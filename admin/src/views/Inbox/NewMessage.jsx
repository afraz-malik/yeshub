import React from "react";
import { Modal, ModalBody, Input, Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { useState } from "react";
import { useEffect } from "react";
import { chat } from "../../api/chat";
import { SEND_NEW_MESSAGE } from "../../variables/events";

const CreateNewMessage = ({ isOpen = false, toggle }) => {
    const [userSearch, setSearchUser] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [message, setMessage] = useState("");
    const [selected, setSelected] = useState({});
    const [dropShow, setShow] = useState(false);

    const onToggle = () => setShow((prev) => !prev);

    const search = (e) => {
        setSearchUser(e.target.value);
        chat.searchUser(userSearch).then((response) => {
            setUsersList(response.data.docs);
            if (response.data.docs.length > 0) {
                setShow(true);
            }
        });
    };

    const typeMessage = (e) => {
        setMessage(e.target.value);
    };

    const onSelect = (user) => {
        setSelected(user);
    };

    useEffect(() => {
        setShow(false);
    }, [selected]);

    const onSend = () => {
        chat.adminToUser({
            message,
            to: selected.id,
        }).then((res) => {
            document.dispatchEvent(
                new CustomEvent(SEND_NEW_MESSAGE, {
                    detail: res,
                })
            );
        });
    };

    return (
        <Modal size="lg" isOpen={isOpen}>
            <ModalBody>
                <div className="d-flex justify-content-between">
                    <h6>New Message</h6>

                    <div className="close__icon" onClick={toggle}>
                        <span>X</span>
                    </div>
                </div>
                <Input
                    type="search"
                    placeholder="Search User"
                    className="search--input mb-2"
                    onChange={search}
                    value={userSearch}
                />
                <Users users={usersList} showDropDown={dropShow} onToggle={onToggle} onSelect={onSelect} />
                <div className="d-flex search--list">
                    <div className="search--item">
                        <img
                            className="user--img"
                            alt="User1234"
                            src={selected.userImage || require("./../../assets/img/header.jpg")}
                        />
                        <h6 className="user--name">{selected.userName}</h6>
                    </div>
                </div>

                <Input
                    className="new--message"
                    type="textarea"
                    name="message"
                    placeholder={"Your message here..."}
                    onChange={typeMessage}
                    value={message}
                />
                <Button color="primary" onClick={onSend} disabled={!message}>
                    Send
                </Button>
            </ModalBody>
        </Modal>
    );
};

const Users = ({ users = [], showDropDown = false, onToggle, onSelect }) => {
    return (
        <Dropdown isOpen={showDropDown} toggle={onToggle} direction={"down"}>
            <DropdownToggle caret>Users</DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Select User</DropdownItem>
                {!users.length ? (
                    <DropdownItem disabled>No User Found</DropdownItem>
                ) : (
                    users.map((item, idx) => (
                        <DropdownItem key={idx} onClick={() => onSelect(item)}>
                            {item.userName}
                        </DropdownItem>
                    ))
                )}
            </DropdownMenu>
        </Dropdown>
    );
};

export default CreateNewMessage;
