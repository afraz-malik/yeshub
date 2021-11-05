import React, { FC, ChangeEvent, useState } from "react"
import { PostImagesTypes } from "../Types/PostImagesType"
import { UploadPhotoImage } from "../../../../Shared/Images/Images"

const PostDragAndDrop: FC<PostImagesTypes> = ({ onChange, onDragDrop }) => {

    const [b, setb] = useState(0)
    
    const onDragEnter = (e :any) => {
        console.log('drag entered ....');
        e.preventDefault();
        setb(2);
    }

    // const onDragDrop = (e: any) => {
    //     setb(0);
    //     e.preventDefault();
    //     console.log('droped ...');
    //     console.log(e.dataTransfer.files);
    //     console.log(e.target.file);
    // }

    const onDragLeave = (e: any) => {
        console.log('drag leaved ...');
        e.preventDefault();
        setb(0);
    }

    const onDragOver = (e: any) => {
        e.preventDefault();
        setb(2);
    }

    return (
        <div className="form-group" onDragOver={onDragOver} onDragLeave={onDragLeave} style={{"border": `${b}px solid green`}} onDragEnter={onDragEnter} onDrop={onDragDrop}>

         {/* <div className="form-group"> */}
            <div id="drop-region">
                <div className="drop-image">
                    <div className="feature_link">
                        <label>
                            <span>
                                <img src={UploadPhotoImage} alt="upload" />
                            </span>
                        </label>
                    </div>
                </div>
                <div className="drop-message">
                    Drag & Drop images or click to upload
                </div>
                <input
                    name="image"
                    type="file"
                    multiple={false}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(e, 0)
                    }
                />
                <div id="image-preview" />
            </div>
        </div>
    )
}

export default PostDragAndDrop
