import React, { FC } from 'react'

import FormInput from '../../../../Components/Form/FormInput'

type PostVideoUrl = {
    onChange: Function
    videoUrl: string
}

const PostVideoUrl: FC<PostVideoUrl> = ({ onChange, videoUrl }) => {
    return (
        <>
            <FormInput
                type="text"
                name="videoUrl"
                props={{
                    placeholder: "Video Url",
                }}
                onChange={onChange}
                defaultValue={videoUrl}
            />
            <small className="text-danger font-weight-bold">
                * Only YouTube video is allowed
            </small>
        </>
    )
}

export default PostVideoUrl
