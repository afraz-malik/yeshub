import React from "react"

import "tinymce/tinymce"
import "tinymce/icons/default"
import "tinymce/themes/silver"
import "tinymce/plugins/paste"
import "tinymce/plugins/link"
import "tinymce/plugins/image"
import "tinymce/plugins/table"
import "tinymce/skins/ui/oxide/skin.min.css"
import "tinymce/skins/ui/oxide/content.min.css"
import "tinymce/skins/content/default/content.min.css"
import { Editor } from "@tinymce/tinymce-react"

const TinyEditor: React.FC<any> = ({ value, height, onChange }) => {
    const handleEditorChange = (content: any) => {
        onChange(content)
    }

    return (
        <Editor
            initialValue={value}
            init={{
                height: height || "500px",
                menubar: true,
                branding: false,
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                    "undo redo | formatselect | bold italic backcolor | bullist numlist outdent indent | \
         alignleft aligncenter alignright alignjustify | \
          removeformat | link | help",
            }}
            onEditorChange={handleEditorChange}
        />
    )
}

export default TinyEditor
