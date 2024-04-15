import { Button, Chip, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import { SimilarityResult } from "./SimilarityResult";


const socket=io('http://localhost:4555')

export const CodeSimilarity=props=>{
   
 const [result,setResult]=useState([])
 
     
    const dataToBeSent={
        directory:'/check',
        files:[
        ]
    }

    useEffect(()=>{
    
        socket.on('result',res=>{
            console.log('res',res)
           res= Array.from(res).sort((b,a)=>a.similarity-b.similarity)
            setResult(res)
        })

        socket.on("connect_error", (err) => {        
  console.log(err.message);
  console.log(err.description);
  console.log(err.context);
                       });
  
        return ()=>socket.disconnect()

    },[])

    const [selectedFiles, setSelectedFiles] = useState([]);
   
    const handleFileChange = (e) => {
      setResult([])
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      console.log('result',result)
    };
  
    // const handleUpload = () => {
    //     console.log(selectedFiles)
    //   selectedFiles.forEach((file) => {
    //     const reader = new FileReader();
                
        
    //       file.text().then(text=>{
    //         console.log(text)
    //     dataToBeSent.files.push( {
    //         fileName: file.name,
    //         code: text,
    //       })

    //     })
    //     // reader.readAsArrayBuffer(file);
    //   });
    //   console.log('data',dataToBeSent)
    //   socket.emit('data',dataToBeSent)

    // };


    const handleUpload = async () => {
        const filesData = await Promise.all(selectedFiles.map(file => readFileAsync(file)));
        console.log(filesData)
        socket.emit('data', {
            directory:'./'+uuidv4(),
            files : filesData
        });
      };
    
      const readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              fileName: file.name,
              code: reader.result,
            });
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        });
      };

    return <>
    <br/>
    <br/>
    <br/>
    <div>
    <input
     type="file"
     multiple
     onChange={handleFileChange}
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
                    onClick={handleUpload}
                    >
                      Check
                    </Button>

                     <div>
                 {selectedFiles.length !==0 ? selectedFiles.map((ele,i)=><Chip style={{color:'white',margin:'5px'}} key={i} label={ele.name}/>):<Typography>No File selected</Typography>}

                     </div>

                {result.length !==0 ? 
                
                
               <SimilarityResult result={result}/>
                    
                   : <>Please Wait for Result</> 
                }

  <Grid>
    
    </Grid>


    </div>
    </>

}