import React from 'react';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor(props) {
    const { value } = props;
    const { handleChangeInfo } = props;

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        }
    };

    return (
        <div className=' w-full'>
            <Editor
                value={value}
                onEditorChange={(e) => handleChangeInfo(e, 'description')}
                apiKey='cerf6p0iinuy5e7bjai7nt823hvba5fwe55f72y41qg50pzi'
                onInit={(_evt, editor) => editorRef.current = editor}
                init={{
                    height: 400,

                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </div>
    );
}