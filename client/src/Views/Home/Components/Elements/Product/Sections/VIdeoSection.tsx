import React, { FC, ReactElement } from "react"
import PostVideoFrame from "../../../../../../Components/Post/PostVideoFrame"
import IProduct from "../../../../../../Models/User/Product"

const VideoSection: FC<{ product: IProduct | undefined }> = ({ product }): ReactElement => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="bg-white">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="stage__title">{product?.title}</h1>
                                <p>{product?.description}</p>
                            </div>
                            <div className="col-md-12 d-flex align-items-center" id="youtube-video">
                                <PostVideoFrame url={product?.videoUrl || ""} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoSection
