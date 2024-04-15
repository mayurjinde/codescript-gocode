import { Editor } from "@monaco-editor/react"
import { Button, Container, List, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { Col, Row } from "react-grid-system"
import { io } from "socket.io-client"
import { PlagCard } from "./PlagCard"

const socket=io('http://127.0.0.1:4999')



export const Plag=(props)=>{
    
    const [code ,setCode]=useState('')

    const [result,setResult]=useState([])

    const editorRef = useRef;


    function handleEditorDidMount(editor, monaco) {
     editorRef.current = editor;
   }

   const sortData = dataArray => {
    return [...dataArray].sort((b,a) => a.similarity - b.similarity);
  };


   useEffect(()=>{
   
   socket.on('result',data=>{
    console.log(data)
    setResult(prevData => {
        const newDataArray = [...prevData, data];



        return sortData(newDataArray);
      });
   })
   
   return ()=>socket.disconnect()

   },[])

   const checkCode=()=>{
   
    socket.emit('checkCode',{query:code})


   }
 

    return <>
     <Container>
        <br/>
        <br/>
    <Row>
        <Col sm={6}> 
        <Editor
         height={'60vh'}
         value={code}
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
         <List>
         {result.length !== 0 ? result.map((Element,i)=>{
          return <PlagCard name={Element.name} link={Element.link} similarity={Element.similarity} key={i} />
         }) : <>Please Wait</>}
       </List>
        </Col>
    </Row>

     </Container>
    
    </>

}