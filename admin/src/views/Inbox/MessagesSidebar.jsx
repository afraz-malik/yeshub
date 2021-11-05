import React, { useState, useEffect } from "react";
import MessagesSidebarItem from "./MessagesSidebarItem";
import { Input } from "reactstrap";
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

const MessagesSidebar = ({ sidebarUsers, archivedUsers }) => {
    const [keyword, setKeyword] = useState("");
    const [searchResult, setSearch] = useState(sidebarUsers);
    const [isActive, setIsActive] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
    const onKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    useEffect(() => {
        
        console.log("archived", archivedUsers);
        if (keyword === "") {
            setSearch(isActive ? sidebarUsers : archivedUsers);
        } else {
            const filtered = sidebarUsers.filter((item) => {
                return (
                    item.user?.userName.toLowerCase().includes(keyword.toLowerCase()) ||
                    item.community?.name.toLowerCase().includes(keyword.toLowerCase())
                );
            });
            setSearch(filtered);
        }
    }, [keyword, sidebarUsers]);

    const style = {
        padding: '20px'
    }

    const toggle = () => {
        // if(isActive) {
        //     setSearch(archivedUsers);
        // } else {
        //     setSearch(sidebarUsers)
        // }
        setIsOpen(!isOpen);
        // setIsActive(!isActive);
    }

    const toggleUsers = () => {
        if(isActive) {
            setSearch(archivedUsers);
        } else {
            setSearch(sidebarUsers)
        }
        setIsOpen(!isOpen);
        // document.dispatchEvent('active', {detail: { isActive: !isActive}});
        setIsActive(!isActive)
        
    }

    return (
        // <div className="flex">
        <>
            <div className="flex">
                <button onClick = {() => toggleUsers()} style={btnPrimaryStyle} className={`btn btn-outline-primary ${isActive ? "active" : ""}`}>Active</button>
                <button onClick = {() => toggleUsers()} style={btnDangerStyle} className={`btn btn-outline-archive ${!isActive ? "active" : ""}`}>Archive</button>
            </div>
            <div className="messages--list custom--bg">
                {/* <div className="flex"> */}
                    <Input style={style} type={"text"} placeholder={"Search"} onChange={onKeywordChange} value={keyword} />
                {/* </div> */}
                
                {!searchResult.length
                    ? "No User"
                    : searchResult.map((item, idx) => <MessagesSidebarItem isArchived={!isActive} user={item} key={idx} />)}
            </div>
        </>
        
    );
};

export default MessagesSidebar;
