import React, { FC, Fragment, ChangeEvent } from "react"
import FormInput from "../../../../Components/Form/FormInput"

type PostLinks = {
    onChange: Function
    links: Array<Record<string, any>>
    onAddLinks: Function
}

const PostLinks: FC<PostLinks> = ({ onChange, onAddLinks, links }) => {
    return (
        <>
            {links.map((item, idx) => (
                <Fragment key={idx}>
                    <FormInput
                        type="text"
                        name="title"
                        props={{
                            placeholder: "Title",
                        }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            onChange(e, idx)
                        }
                        defaultValue={item.title}
                    />
                    <FormInput
                        type="text"
                        name="url"
                        props={{
                            placeholder: "Url",
                        }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            onChange(e, idx)
                        }
                        defaultValue={item.url}
                    />
                </Fragment>
            ))}
            {/* <div className="form-group">
                <button
                    className="btn-links"
                    type="button"
                    onClick={() => onAddLinks()}
                >
                    + Add more
                </button>
            </div> */}
        </>
    )
}

export default PostLinks
