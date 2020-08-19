import React, { useState, useEffect } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const MyRichText = () => {
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));
    // useEffect(
    //     () =>{
    //         const htmlContent = 'hello world';
    //         setEditorState(BraftEditor.createEditorState(htmlContent));
    //     }
    // );

    // 按下ctrl + s时执行此方法
    const submitContent = () =>{
        const htmlContent = editorState.toHTML();
        // const result = saveEditorContent(htmlContent);
        console.log(htmlContent);
    }

    const handleEditorChange = (editor : any) => {
        setEditorState(editor);
    }

    return(
        <div>
            <BraftEditor 
                value = {editorState}
                onChange = {handleEditorChange}
                onSave = {submitContent}
            />
        </div>
    );

}

export default MyRichText;