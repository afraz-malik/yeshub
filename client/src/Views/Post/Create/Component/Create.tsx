import JoditEditor from "jodit-react"
import _ from "lodash"
import React, { ChangeEvent, FC, MouseEvent, ReactElement, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { faVideo, faLink, faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Form from "../../../../Components/Form/Form"
import FormInput from "../../../../Components/Form/FormInput"
import SelectCommunity from "../../../../Components/SelectElement/SelectCommunity"
import FormHeader from "../../../../Container/Top/FormHeader"
import PostDragAndDrop from "./PostDragAndDrop"
import PostImages from "./PostImages"
import PostLinks from "./PostLinks"
import PostVideoUrl from "./PostVIdeo"
import assetUrl from "../../../../Helpers/Functions/assetUrl"
import Post from "../../../../Helpers/Request/Services/Post/Post"
import removeAssetUrl from "../../../../Helpers/Functions/removeAssetUrl"

import FileUploader from "../../../../Helpers/Request/Services/uploadFile/FileUpload"
import Images from "../../../../Components/ImageGallery/components/Images"

import tagsApi from "../../../../Helpers/Request/Services/Tags"
import Editor from "../../../../Components/Editors"

const loader = "https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"

const config = {
    readonly: false,
    buttons: [
        "bold",
        "strikethrough",
        "underline",
        "italic",
        "eraser",
        "superscript",
        "subscript",
        "ul",
        "outdent",
        "ol",
        "indent",
        "align",
        "undo",
        "redo",
        "\n",
        "selectall",
        "cut",
        "copy",
        "paste",
        "copyformat",
        "|",
        "hr",
        "symbol",
        "print",
        "about",
    ],
    allowResizeY: true,
}

const Create: FC = (): ReactElement => {
    const { state }: any = useLocation()
    const [relatedLinks, setRelatedLinks] = useState<
        {
            title: string
            url: string
        }[]
    >([])

    const [showAdditionalTabs, setAdditionalTabs] = useState({
        images: false,
        links: false,
        video: false,
    })

    const [values, setValues] = useState<any>({
        images: [],
        title: "",
        knowledgeGroup: state && state.create_from === "community_detail" ? state.community : "",
        link: relatedLinks,
        roleId: "5e2fd51f34ce7375a792ffc4",
        isPublished: true,
        tag: "",
        tags: [],
    })

    // if it is creating new post it will be always empty else draft description will be added here one time
    const [draftDescription, setdraftDescription] = useState(state ? state.description : "")

    const [description, setDescription] = useState()
    const [searchResults, setsearchResults] = useState([])

    const [searchResultShow, setsearchResultShow] = useState({ show: false })
    const [previews, setPreviews] = useState<any>([])
    const editor = useRef(null)

    useEffect(() => {
        setValues({
            ...values,
            link: relatedLinks,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [relatedLinks])

    useEffect(() => {
        const clickHandler = () => {
            setTimeout(() => {
                setsearchResultShow({ ...searchResultShow, show: false })
            }, 100)
        }

        window.addEventListener("click", clickHandler)

        return () => {
            window.removeEventListener("click", e => {})
        }
    }, [])

    useEffect(() => {
        if (showAdditionalTabs.links) {
            setRelatedLinks(
                relatedLinks.concat({
                    title: "",
                    url: "",
                })
            )
        } else {
            setRelatedLinks([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showAdditionalTabs.links])

    useEffect(() => {
        if (state && state.create_from !== "community_detail") {
            let vals = values
            if (state.image.length) {
                let images = state.image.map((img: string, index: number) => assetUrl(img))
                vals.image = images
            }
            vals.title = state.title
            vals.ID = state._id
            // vals.knowledgeGroup = state.knowledgeGroup?._id
            vals.knowledgeGroup = state.knowledgeGroup
            setValues({ ...vals })

            if (state.image.length) {
                let p = previews
                state.image.forEach((itm: any) => {
                    p.push(assetUrl(itm))
                })
                p.push("")
                setPreviews([...previews])
                // showAdditionalTabs.images = true
                setAdditionalTabs({ ...showAdditionalTabs, images: true })
                // setAdditionalTabs({ ...showAdditionalTabs })
                console.log("previews", previews, showAdditionalTabs)
            } else {
                setPreviews([""])
            }

            setDescription(state.description)

            if (state.link.length !== 0) {
                state.link.map((item: { _id?: string; title: string; url: string }) => delete item._id)
                setRelatedLinks(state.link)
            }
            if (state.videoUrl) {
                setValues({
                    ...values,
                    title: state.title,
                    ID: state._id,
                    knowledgeGroup: state.knowledgeGroup?._id,
                    videoUrl: state.videoUrl,
                })
            }
            console.log("--- state ---")
            console.log(state)
            console.log(previews)
            console.log("--- state ---")
        } else {
            setPreviews([""])
        }
        console.log("check previews ", previews)
        window.scrollTo(0, 0)
        // eslint-disable-next-line
    }, [])

    const onTabClick = (e: MouseEvent<HTMLElement>) => {
        const falseValues = _.mapValues(showAdditionalTabs, () => false)
        setAdditionalTabs({
            ...falseValues,
            [e.currentTarget.id]: true,
        })
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { type, name, value, checked } = e.target

        if (type === "checkbox") {
            setValues({
                ...values,
                [name]: checked,
            })
            return
        }
        setValues({ ...values, [name]: value })
    }

    const onDescriptionChange = (content: any) => {
        setDescription(content)
    }

    const onImageChange = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
        e.preventDefault()
        if (e.target.files) {
            let files = Array.from(e.target.files)
            let vals = values
            let prevs: any[] = []
            files.forEach((file: any) => prevs.push(loader))
            if (state && state._id) {
                files.forEach(file => {
                    const data = new FormData()
                    data.append("images", file)
                    Post.updateImage(data, state._id)
                })
            }
            let counter = previews.length
            let d = [...previews, ...prevs, ""]

            setPreviews(d)
            console.log("+++ previews", previews)
            // let uploadedFiles = await
            Promise.all(
                files.map((file: any) => {
                    // vals.images.push(file);
                    return new Promise((resolve, reject) => {
                        let fd = new FormData()
                        fd.append("images", file)
                        FileUploader.uploadFile(fd).then(res => {
                            resolve(res.data.data)
                        })
                    })
                })
            ).then(uploadedFiles => {
                let vals = values
                uploadedFiles.forEach(file => {
                    vals.images.push(file)
                })

                previews.splice(counter - 1, uploadedFiles.length)

                setValues(vals)
                // previews.splice(previews.length -1 , 1);
                uploadedFiles = uploadedFiles.map((file: any) => assetUrl(file))
                setPreviews([...previews, ...uploadedFiles, ""])
            })
        }
    }

    const addTag = (tag: any) => {
        tagsApi
            .create(tag)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))

        values.tags.push(tag)
        setValues({ ...values, tag: "" })
        setsearchResultShow({ show: false })
    }

    const onKeyPressHandle = (e: any) => {
        searchTag(e.target.value)
        if (e.charCode === 13) {
            addTag(e.target.value)
            e.preventDefault()
        }
        // setValues({...values, tag: e.target.value});
    }

    const onDragDrop = (e: any) => {
        e.preventDefault()

        if (e.dataTransfer.files) {
            let files = Array.from(e.dataTransfer.files)
            if (state && state._id) {
                files.forEach((file: any) => {
                    const data = new FormData()
                    data.append("images", file)
                    Post.updateImage(data, state._id)
                })
            }
            let vals = values
            let prevs: any[] = []
            files.forEach(file => prevs.push(loader))
            let d = [...previews, ...prevs, ""]
            setPreviews(d)
            console.log("+++ previews", previews)
            // let uploadedFiles = await
            Promise.all(
                files.map((file: any) => {
                    // vals.images.push(file);
                    return new Promise((resolve, reject) => {
                        let fd = new FormData()
                        fd.append("images", file)
                        FileUploader.uploadFile(fd).then(res => {
                            resolve(res.data.data)
                        })
                    })
                })
            ).then(uploadedFiles => {
                let vals = values
                uploadedFiles.forEach(file => {
                    vals.images.push(file)
                })

                previews.splice(previews.length - uploadedFiles.length - 1, uploadedFiles.length)

                setValues(vals)
                previews.splice(previews.length - 1, 1)
                uploadedFiles = uploadedFiles.map((file: any) => assetUrl(file))
                setPreviews([...previews, ...uploadedFiles, ""])
            })
        }
    }

    const onRemoveImage = (index: number) => {
        if (state && state._id) {
            console.log("on remove testing", state, values.images, index)
            Post.deleteImage({
                ID: state._id,
                image: removeAssetUrl(values.images[index]),
            })
        }

        // values.images.splice(index, 1);
        // values.images[index] = previews[index] = ""

        setValues({ ...values })
        FileUploader.deleteFile(values.images[index])
        values.images.splice(index, 1)
        previews.splice(index, 1)
        // previews[index] = "";
        setPreviews(previews)
    }

    const onLinksChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value } = e.target

        let relatedClone = relatedLinks
        relatedClone[id] = { ...relatedClone[id], [name]: value }
        setRelatedLinks(relatedClone)
    }

    const onAddLink = () => {
        setRelatedLinks(
            relatedLinks.concat({
                title: "",
                url: "",
            })
        )
    }

    const onDeleteTag = (itm: any, index: number) => {
        values.tags.splice(index, 1)
        setValues({ ...values })
    }

    const getFormData = () => {
        let data = !description
            ? { ...values }
            : {
                  ...values,
                  description,
              }
        if (state && state._id) {
            data = { ...data, ID: state._id }
            delete data.images
            delete data.roleId
        }

        console.log("---- data while creating post  ------")
        console.log(data)
        console.log("---- data while creating post  ------")

        return data
    }

    const searchTag = (query: string) => {
        setTimeout(() => {
            tagsApi
                .search(query)
                .then(res => {
                    console.log("search results", res.data.data)
                    let searches = res.data.data.filter((itm: any) => values.tags.indexOf(itm.name) === -1)
                    setsearchResults(searches)
                    if (res.data.data.length > 0) {
                        setsearchResultShow({ show: true })
                    } else {
                        setsearchResultShow({ show: false })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }, 200)
    }

    return (
        <div className="cp-wrap">
            <FormHeader title="Create Post" showDrafts={false} />

            <div className="cp-form mt-3">
                <div className="form-group">
                    <SelectCommunity onSelect={onChange} selectedCommunity={values.knowledgeGroup} />
                </div>

                <Form
                    data={getFormData()}
                    submitUrl={/*state ? "/post/update" : */ "/general/post"}
                    validate
                    isFormData={false}
                    props={{
                        saveAsDraft: true,
                    }}
                    className="form mt-3"
                    method={"POST"}
                    buttonText="POST"
                    refreshUser
                    redirectUrl={"/communities"}
                    formId="create_post"
                >
                    <FormInput
                        name="title"
                        type={"text"}
                        isRequired
                        onChange={onChange}
                        className="form-control form-input2"
                        props={{
                            placeholder: "TITLE*",
                        }}
                        defaultValue={values.title}
                    />
                    <div className="form-group">
                        <div className="d-flex flex-row">
                            <div className="feature_link" id="images" onClick={onTabClick}>
                                <label>
                                    <span className="mr-1">
                                        <FontAwesomeIcon icon={faUpload} />
                                    </span>
                                    <span>Feature image/s</span>
                                </label>
                            </div>
                            <div className="feature_link ml-2" id="links" onClick={onTabClick}>
                                <label>
                                    <span>
                                        <FontAwesomeIcon icon={faLink} />
                                    </span>
                                    <span> Feature link</span>
                                </label>
                            </div>
                            <div className="feature_link ml-2" id="video" onClick={onTabClick}>
                                <label>
                                    <span>
                                        <FontAwesomeIcon className="icon" icon={faVideo} />
                                    </span>
                                    <span> Feature Video</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {showAdditionalTabs.images && !values.images[0] && previews[0] === "" ? (
                        <PostDragAndDrop
                            onChange={onImageChange}
                            imagePreviews={previews}
                            onRemoveImage={onRemoveImage}
                            onDragDrop={onDragDrop}
                        />
                    ) : (
                        showAdditionalTabs.images &&
                        values.images[0] !== null &&
                        previews[0] !== "" && (
                            <PostImages
                                onChange={onImageChange}
                                imagePreviews={previews}
                                onRemoveImage={onRemoveImage}
                            />
                        )
                    )}

                    {showAdditionalTabs.links && (
                        <PostLinks onChange={onLinksChange} links={values.link} onAddLinks={onAddLink} />
                    )}

                    {showAdditionalTabs.video && <PostVideoUrl videoUrl={values.videoUrl} onChange={onChange} />}
                    <div className="form-group">
                        <Editor
                            ref={editor}
                            value={draftDescription}
                            config={config}
                            onChange={(content: any) => onDescriptionChange(content)}
                        />
                        {/* <JoditEditor
                            ref={editor}
                            value={description}
                            config={config}
                            onBlur={content => onDescriptionChange(content)}
                        /> */}
                    </div>

                    <div style={{ position: "relative" }}>
                        <input
                            name="tag"
                            type="text"
                            onChange={onChange}
                            onKeyPress={e => onKeyPressHandle(e)}
                            className="form-control form-input2"
                            value={values.tag}
                            placeholder="Add tag"
                        />
                        {searchResultShow.show && (
                            <PlaceholderContainer
                                onItemClick={(t: any, ind: any) => addTag(t.name)}
                                tags={searchResults}
                            />
                        )}
                    </div>
                    <div className="d-flex flex-row" style={{ marginBottom: "10px" }}>
                        {values.tags.map((itm: any, index: number) => (
                            <Tag tag={itm} onDelete={() => onDeleteTag(itm.id, index)} key={index} />
                        ))}
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Create

export const Tag: React.FC<any> = ({ tag, onDelete }) => {
    return (
        <div
            style={{
                padding: "5px 2em 5px 10px",
                borderRadius: "50px",
                margin: "1em 1em 1em 0",
                display: "inline-block",
                position: "relative",
                backgroundColor: "yellow",
                color: "black",
            }}
        >
            <span onClick={e => onDelete(e)} style={{ position: "absolute", top: "4px", right: "5px" }}>
                {CloseIcon}
            </span>
            <span>{tag}</span>
        </div>
    )
}

export const CloseIcon = (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10.2661" r="10" fill="white" />
        <path d="M6 6.26611L14 14.2661M14 6.26611L6 14.2661" stroke="#FFD300" stroke-width="2" />
    </svg>
)

export const PlaceholderContainer: React.FC<any> = ({ tags = [], onItemClick }) => {
    return (
        <>
            <div
                style={{
                    border: "1px solid lightgray",
                    minWidth: "250px",
                    display: "inline-block",
                    position: "absolute",
                    left: 0,
                    top: 45,
                    padding: "5px 15px",
                    backgroundColor: "white",
                    zIndex: 123123,
                }}
            >
                {tags.map((itm: any, index: number) => (
                    <li
                        className="placeholder-list-item"
                        style={{ listStyle: "none" }}
                        onClick={() => onItemClick(itm, index)}
                    >{`#${itm.name}`}</li>
                ))}
            </div>
        </>
    )
}
