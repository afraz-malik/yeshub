import React, { FC, ReactElement } from 'react'

import { getYouTubeVideoId } from '../../Helpers/Functions/getYoutubeVideoId'

type PostVideo = {
    url: string
}

const PostVideoFrame: FC<PostVideo> = ({ url }): ReactElement => {
    return (
        <>
            {url.includes("embed") ? (
                <iframe
                    title={url}
                    src={url}
                    allowFullScreen={true}
                    frameBorder={0}
                />
            ) : (
                <iframe
                    title={url}
                    src={getYouTubeVideoId(url)}
                    allowFullScreen
                    frameBorder={0}
                />
            )}
        </>
    )
}

export default PostVideoFrame
