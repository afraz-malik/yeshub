import * as React from "react"

import LinkPreview from "../../Helpers/Request/Services/LinkPreview"
import { ILinkPreview } from "../../Models/ILinkPreview"

export interface FeaturedLinkProps {
    post: any
}

const FeaturedLink: React.FC<FeaturedLinkProps> = ({ post }) => {
    const [previewData, setPreviewData] = React.useState<ILinkPreview>()

    React.useEffect(() => {
        LinkPreview.preview(post.url)
            .then(response => {
                if (response.data.status !== 417) {
                    setPreviewData(response.data as ILinkPreview)
                }
            })
            .catch(err => console.log(err))

        return () => {}
        // eslint-disable-next-line
    }, [])

    return previewData ? (
        <li className="featured__link">
            <div className="d-flex feature__link-details">
                <a className="feature__link-url product__img" href={post.url} target="_blank" rel="noopener noreferrer">
                    <img
                        className="feature__link-img"
                        src={
                            previewData?.links?.thumbnail?.length > 0
                                ? previewData?.links?.thumbnail[0]?.href
                                : previewData?.links?.icon?.length
                                ? previewData?.links?.icon[0]?.href
                                : ""
                        }
                        alt={`${previewData?.meta?.title || ""} - ${previewData?.meta?.description || ""}`}
                    />
                </a>
            </div>
            <a className="feature__link-url" href={post.url} target="_blank" rel="noopener noreferrer">
                {post.url}
            </a>
        </li>
    ) : null
}

export default FeaturedLink
