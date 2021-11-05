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
import PostDragAndDrop from "./PostDragAndDrop-backup"
import PostImages from "./PostImages"
import PostLinks from "./PostLinks"
import PostVideoUrl from "./PostVIdeo"
import assetUrl from "../../../../Helpers/Functions/assetUrl"
import Post from "../../../../Helpers/Request/Services/Post/Post"
import removeAssetUrl from "../../../../Helpers/Functions/removeAssetUrl"

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
        knowledgeGroup: "",
        link: relatedLinks,
        roleId: "5e2fd51f34ce7375a792ffc4",
        isPublished: true,
    })

    const [description, setDescription] = useState("")

    const [previews, setPreviews] = useState<any>(["", "", "", "", ""])
    const editor = useRef(null)

    useEffect(() => {
        setValues({
            ...values,
            link: relatedLinks,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [relatedLinks])

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
        if (state) {
            console.log(".. edit mode ..");
            console.log(state);
            let vals = values;
            if(state.image.length) {
                let images = state.image.map((img: string, index: number) => assetUrl(img))
                vals.images = images;
            }
            vals.title = state.title;
            vals.ID = state._id;
            vals.knowledgeGroup = state.knowledgeGroup?._id;
            setValues({...vals})
            // setValues({
            //     ...values,
            //     images: previews.map((img: string, index: number) =>
            //         state.image[index] ? assetUrl(state.image[index]) : ""
            //     ),
            //     title: state.title,
            //     ID: state._id,
            //     knowledgeGroup: state.knowledgeGroup?._id,
            // })

            if (state.image.length) {
                // setPreviews(
                //     previews.map((img: string, index: number) =>
                //         state.image[index] ? assetUrl(state.image[index]) : ""
                //     )
                // )
                let p = previews;
                state.image.forEach((itm: any) => {
                    p.push(assetUrl(itm));
                })
                p.push("");
                setPreviews(previews);
                showAdditionalTabs.images = true;
                setAdditionalTabs({...showAdditionalTabs});
                console.log('previews', previews, showAdditionalTabs);
            }
            setDescription(state.description)

            if (state.link.length !== 0) {
                state.link.map((item: { _id: string; title: string; url: string }) => delete item._id)
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

            console.log('values in state:', values)
        } else {
        }
        
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

    const onDescriptionChange = (content: string) => {
        setDescription(content)
    }

    /*
    const onImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        e.preventDefault()
        let { files } = e.target
        console.log('files testing',state, files);
        let reader = new FileReader()
        setValues({ ...values, images: files })

        let oldImages = values.images
        let oldPreviews = previews

        reader.onloadend = () => {
            oldImages[index] = files![0]
            oldPreviews[index] = reader.result
            setPreviews(oldPreviews)
            setValues({ ...values })
            console.log('values', values);
            if (state && state._id) {
                const data = new FormData()
                data.append("images", files![0])
                Post.updateImage(data, state._id)
            }
        }

        reader.readAsDataURL(files![0])
    }*/

    // const onImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    //     e.preventDefault()
    //     if(e.target.files) {
    //         let files = Array.from(e.target.files)
    //         Promise.all(files.map((file : any) => {
    //             return (new Promise((resolve,reject) => {
    //                 const reader = new FileReader();
    //                 reader.addEventListener('load', (ev:any) => {
    //                     resolve(ev.target.result);
    //                 });
    //                 reader.addEventListener('error', reject);
    //                 reader.readAsDataURL(file);
    //             }));
    //         }))
    //         .then(images => {
    
    //             /* Once all promises are resolved, update state with image URI array */
    //             setPreviews(images)
    //             console.log('promises', images)
    //             if (state && state._id) {
    //                 const data = new FormData()
    //                 data.append("images", files![0])
    //                 Post.updateImage(data, state._id)
    //             }
    
    //         }, error => {        
    //             console.error(error);
    //         });


    //         // let reader = new FileReader()
    //         // setValues({ ...values, images: files })

    //         // let oldImages = values.images
    //         // let oldPreviews = previews

    //         // reader.onloadend = () => {
    //         //     oldImages[index] = files![0]
    //         //     oldPreviews[index] = reader.result
    //         //     setPreviews(oldPreviews)
    //         //     setValues({ ...values })

    //         //     if (state && state._id) {
    //         //         const data = new FormData()
    //         //         data.append("images", files![0])
    //         //         Post.updateImage(data, state._id)
    //         //     }
    //         // }

    //         // reader.readAsDataURL(files![0])
    //     }
    // }


    const onImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        e.preventDefault()
        let { files } = e.target
        console.log('files testing',state, files);
        let reader = new FileReader()
        setValues({ ...values, images: files })

        let oldImages = values.images
        let oldPreviews = previews

        reader.onloadend = () => {
            oldImages[index] = files![0]
            oldPreviews[index] = reader.result
            setPreviews([...oldPreviews, ""])
            setValues({ ...values })
            console.log('values', values);
            if (state && state._id) {
                const data = new FormData()
                data.append("images", files![0])
                Post.updateImage(data, state._id)
            }
        }

        reader.readAsDataURL(files![0])
    }

    
    const onDragDrop = (e: any) => {
        e.preventDefault();
        console.log('state testing', state);
        console.log(e.dataTransfer.FileList);
        let { files } = e.dataTransfer;
        
        let it = values.images;
        // setValues({...values, images: files});
        let list = Array.from(files);
        // setValues({...values, images: list});
        console.log('drag', files);
            Promise.all(list.map((file :any) => {
                return (new Promise((resolve,reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev:any) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                    setValues({...values});
                    it.push(file);
                }));
            }))
            .then(images => {
    
                /* Once all promises are resolved, update state with image URI array */
                setPreviews([...images, ""])
                
                
                // setValues({...values, images: it});
                console.log('values', values)
                console.log('promises', images)
                if (state && state._id) {
                    const data = new FormData()
                    for(let i = 0; i<files.length; i++) {
                      data.append("images", files[i])  
                    }
                    
                    Post.updateImage(data, state._id)
                }
    
            }, error => {        
                })
        // let { files } = e.dataTransfer;
        // let reader = new FileReader()
        // setValues({ ...values, images: files })

        // let oldImages = values.images
        // let oldPreviews = previews

        // reader.onloadend = () => {
        //     oldImages[0] = files![0]
        //     oldPreviews[0] = reader.result
        //     setPreviews(oldPreviews)
        //     setValues({ ...values })

        //     if (state && state._id) {
        //         const data = new FormData()
        //         data.append("images", files![0])
        //         Post.updateImage(data, state._id)
        //     }
        // }

        // reader.readAsDataURL(files![0])

    }

    const onRemoveImage = (index: number) => {
        if (state && state._id) {
            console.log('on remove testing', state, values.images, index);
            Post.deleteImage({
                ID: state._id,
                image: removeAssetUrl(values.images[index]),
            })
        }

        // values.images.splice(index, 1);
        values.images[index] = previews[index] = ""

        setValues({ ...values })
        // previews.splice(index, 1);
        previews[index] = "";
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

        return data
    }

    return (
        <div className="cp-wrap">
            <FormHeader title="Create Post" showDrafts={true} />

            <div className="cp-form mt-3">
                <div className="form-group">
                    <SelectCommunity onSelect={onChange} selectedCommunity={values.knowledgeGroup} />
                </div>

                <Form
                    data={getFormData()}
                    submitUrl={state ? "/post/update" : "/general/post"}
                    validate
                    isFormData={!state}
                    props={{
                        saveAsDraft: true,
                    }}
                    className="form mt-3"
                    method={state ? "PUT" : "POST"}
                    buttonText="POST"
                    refreshUser
                    redirectUrl={"/communities"}
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
                        <JoditEditor
                            ref={editor}
                            value={description}
                            config={config}
                            onBlur={content => onDescriptionChange(content)}
                        />
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Create
