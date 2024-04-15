import Editor from "@monaco-editor/react";

import { useRef } from "react";


const UserInputOutput = (props) => {
  const {
    text,
    onChange,
    isInput
  } = props

  const handleChange = (editor, data, value) => {
    onChange(value)
  }

  return (
    <>
     
<Editor value={text} height="100px" onChange={handleChange}

options={{
    readOnly:isInput 
  }}
/> 
      
    </>
  )
}

export default UserInputOutput;