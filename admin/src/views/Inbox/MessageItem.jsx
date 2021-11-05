import React from "react";
import { formattedTime } from "../../helper/fomrattedDate";
import toImageUrl from '../../helper/toImageUrl';
const REG_EXP_URL = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
const isURL = (url) => {
    return REG_EXP_URL.test(url);
}
const baseurl = `${window.location.protocol}//${process.env.REACT_APP_API_URL}/`;
const MessageItem = ({ isReceived = true, message }) => {
    const { seen, createdAt } = message;
    return (
        <div  className={`message--item-container d-flex ${!message.from ? "welcome-message" : ""}  ${isReceived ? "received" : ""}`}>
                <div className="message--item d-flex flex-nowrap ">
                  {
                    !message.from
                      ? ""
                      : <img src={message.from?.userImage ? toImageUrl(message?.from?.userImage) : ""} alt="" className="user--img" />
                  }
                  <div className="message wordwrap">
                      <p className={`${!message.from ? "welcome": "text"}`}>
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
                          )
                        }
                          
                              {
                                !message.image 
                                  ? ("")
                                  : (<img className="message--img" alt="" src={baseurl + message.image} />) 
                              } 
                          
                      </p>
                      {message.seen && <small className="text-muted">&#10003; seen</small>}
                      {/* <span className="time">{formatTime(message.createdAt)}</span> */}
                  </div>
              </div>
          </div>
    );
};

export default MessageItem;
