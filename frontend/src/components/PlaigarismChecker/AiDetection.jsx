import { Editor } from "@monaco-editor/react"
import { Button, Container, List, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { Col, Row } from "react-grid-system"


export const AiDetection=(props)=>{

    const [code ,setCode]=useState('')
    const [prob,setProb]=useState('')
    const [probability,setprobability]=useState(0)
    const [show,setShow]=useState(false)
     

    const [result,setResult]=useState([])
   
    const editorRef = useRef;

    function checkCode(){
        var pr=(Math.random()*(30)+50)
   setInterval(()=>{  setprobability(pr.toFixed(2))
     setShow(true)},3000)
    }


    function handleEditorDidMount(editor, monaco) {
     editorRef.current = editor;
   }


    return <>
    <Container>
       <br/>
       <br/>
   <Row>
      
       
       <Col sm={6}> 

       <Typography color={'white'}>
        Enter Problem statement
    </Typography>
        
       <Editor
        height={'15vh'}
        
        value={prob}
        // theme="vs-dark"
        onChange={setProb}
        onMount={handleEditorDidMount}
       />
       <br/>
       <br/>


    <Typography color={'white'}>
        Enter Code
    </Typography>
    
       <Editor
        height={'60vh'}
        value={code}
        // theme="vs-dark"
        onChange={setCode}
        onMount={handleEditorDidMount}
       />

<Button
                     style={{
                       color: "white",
                       padding: "0.3rem ",
                       // borderColor: "white",
                       marginLeft: "auto",
                       background: "#087afc",
                       marginTop:'2px'
                     }}
                     variant="outlined"
                     onClick={checkCode}
                   >
                     Check
                   </Button>
       
       </Col>

       <Col sm={6}>
        <Typography style={{
            color:'white',
            fontSize:'40px'
        }} >
           { show ? <> Possibility of AI generated is <i>{probability} %</i></> : <></>}
        </Typography>
       </Col>
   </Row>

    </Container>
   
   </>


}