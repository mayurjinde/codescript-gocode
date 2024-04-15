

import { Editor } from "@monaco-editor/react"

import { useRef } from "react";

const ViewCode = (props) => {
  const {
    languageMode,
    code,

  } = props

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
   editorRef.current = editor;
 }


console.log('hello viewcode')

  return (
  
     
     <Editor value={code}
     height="40vh"
       options={{readOnly:true}}
       onMount={handleEditorDidMount}
     />
   
  )
}

export default ViewCode;