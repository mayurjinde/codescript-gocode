import Editor from "@monaco-editor/react";

import { useRef } from "react";

const LANGUAGE_MODE = {
  "cpp17": "cpp",
  "python3": "python",
  "java": "java",
  "c": "c",
};

const CodeEditor = (props) => {

  //  console.log(props)

   let {code,setCode,languageMode}=props

   const editorRef = useRef(null);

   function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }


  
  console.log('lang',languageMode)
   
   


  return (

<Editor
      height="450px"
      language={LANGUAGE_MODE[languageMode]}
      theme="vs-dark"
      value={code}
      onChange={setCode}
      onMount={handleEditorDidMount}
    />

 
  
 )
}

export default CodeEditor;