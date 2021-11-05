import React, { FC } from "react"
import { PlusIcon, CloseIcon } from "../../../../Shared/Images/Images"
import { PostImagesTypes } from "../Types/PostImagesType"

const PostImages: FC<PostImagesTypes> = ({
    onChange,
    imagePreviews,
    onRemoveImage,
}) => {
    console.log('post images (previews)', imagePreviews);
    return (
        
        <div className="form-group position-relative featured__image">
            <div className="upload-post-image">
                <div className="posted-image">
                    <img
                        src={imagePreviews[0] ? imagePreviews[0] : PlusIcon}
                        className="img-fluid"
                        alt="dummy"
                    />
                    <input
                        name="image"
                        id="some"
                        className="btn btn-primary"
                        type="file"
                        onChange={e => onChange(e, 0)}
                    />
                    <div className="removeImage">
                        <button type="button" onClick={() => onRemoveImage(0)}>
                            <img
                                src={CloseIcon}
                                className="img-fluid"
                                alt="dummy"
                            />
                        </button>
                    </div>
                </div>
                <div className="upload-image-button">
                    <div className="d-flex flex-wrap justify-content-center mt-3">
                        {imagePreviews.slice(1).map((img, index) => (
                            <div className="button-upload">
                                {img ? (
                                    <div className="removeImage">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onRemoveImage(index + 1)
                                            }
                                        >
                                            <img
                                                src={CloseIcon}
                                                className="img-fluid"
                                                alt={`${index + 1}`}
                                            />
                                        </button>
                                    </div>
                                ) : null}
                                <label
                                    htmlFor={`image-${index + 1}${
                                        img ? "e" : ""
                                    }`}
                                >
                                    <input
                                        type="file"
                                        id={`image-${index + 1}`}
                                        onChange={e => onChange(e, index + 1)}
                                    />
                                    <img src={img ? img : PlusIcon} alt="add" />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostImages
