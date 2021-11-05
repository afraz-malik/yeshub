import React, { FC, useEffect, useState } from "react"

import Form from "../../../../Components/Form/Form"
import FormInput from "../../../../Components/Form/FormInput"

type CommentBox = {
    onChange: Function
    // data: Record<string, string | number>
    data: string
    postId: any
    submitUrl: string
    isCommentAllowed: boolean
    afterComment?: (data?: any) => void
}

const CommentBox: FC<CommentBox> = ({ onChange, postId, data, submitUrl, isCommentAllowed = true, afterComment }) => {
    const [values, setValues] = useState(data)

    useEffect(() => {
        setValues(data);
    }, [data])


    const commentSuccess = (data: any) => {
        console.log('comment success', data);
        if(afterComment) 
        afterComment(data.body);
    }


    return isCommentAllowed ? (
        <div className="mc-border p-2 mt-4">
            <div className="cp-form p-0">
                <div className="form-group mb-0">
                    <Form
                        validate
                        className="d-flex align-items-center comment__form"
                        submitUrl={submitUrl}
                        data={{body: data, postId: postId}}
                        buttonText="Comment"
                        formId={"comment"}
                        afterSubmit={commentSuccess}
                        submitBtnWrapperClass=""
                        props={{
                            submitButtonClass: "btn btn-signup comment__btn",
                        }}
                    >
                        <FormInput
                            className="form-control form-input2"
                            inputWrapperClass="form-group comment__input"
                            onChange={onChange}
                            name="body"
                            props={{
                                rows: "2",
                                placeholder: "Write your comment..",
                                value: values,
                            }}
                        />
                    </Form>
                </div>
            </div>
        </div>
    ) : null
}

export default CommentBox
