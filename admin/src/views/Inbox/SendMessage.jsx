import React from "react";
import { Input, Button, Form } from "reactstrap";
import ImageUpload from '../../components/ImageUploader/index';

const SendMessage = ({onFocus, onSend, onChange, message, onKeyUp, onImageClosed, onImageChange, onImageUploadStarts }) => {


    return (
        
 
        <Form onSubmit={onSend}>
            <div className="message--input">
            <div className="flex">
            <ImageUpload 
                    imageUploadStarts={onImageUploadStarts}
                    onImageClosed={onImageClosed} 
                    onImageChange={onImageChange} 
                    />
                <Input
                    type={"textarea"}
                    name="message"
                    className={"message--text h-40"}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    value={message}
                    placeholder={"Type Your Message Here"}
                    onFocus={onFocus}
                />
                <Button className="send--btn" type={"submit"}>
                    <img alt="Send Message" src={require("./../../assets/img/send.svg")} />
                </Button>
            </div>
            </div>
        </Form>
    );
};

export default SendMessage;
