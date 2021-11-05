import React, {setState, useState, useEffect} from "react";
import {UncontrolledDropdown, DropdownToggle, DropdownItem, Dropdown, DropdownMenu } from "reactstrap";
import {chat} from '../../api/chat';
// const MessageHeader = ({ current }) => {

class MessageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }

        console.log(props.current);

        this.archive = this.archive.bind(this);
        this.toggle = this.toggle.bind(this);
        
        
    }
    archive = (conID) => {
        
        chat.archiveThread(conID)
        .then(res => {
            console.log(res);
            alert('conversation archived successfully...');
            this.props.archived(conID);
        }, err => console.log(err))
        this.setState({isOpen: false})
    }

    unarchive = (conID) => {
        chat.unarchiveThread(conID).then(res => {
            this.props.unarchived(conID)
        })
    }

    componentDidMount = function() {
     
    }

    componentWillUnmount = function(){
        document.body.removeEventListener('click', function() {
            
        });
    }
    

    toggle = () => {
        console.log('toggline ...');
        this.setState({isOpen: !this.state.isOpen})
    };

    

    render() {
        
        return (
            <div className="d-flex justify-content-between border-bottom mb-2 pb-2">
                <div className="message--header d-flex align-items-center">
                    <img src={this.props.image} alt="" className="user--img" />
                    {/* <img src={this.props.current?.user?.userImage || this.props.current?.community?.logo} alt="" className="user--img" /> */}
                    <h3 className="user--name mb-0 ml-1">{this.props.current?.user?.userName || this.props.current?.community?.name}</h3>
                </div>
                <div>
                    {!this.props.current?.isArchived
                      ? <button className="btn btn-sm btn-danger" onClick={() => this.archive(this.props.current.conversationID)}>archive</button>
                      : <button className="btn btn-sm btn-success" onClick={() => this.unarchive(this.props.current.conversationID)}>unarchive</button>
                    }
                    
                </div>
            </div>
        );
    }
    
};

export default MessageHeader;
