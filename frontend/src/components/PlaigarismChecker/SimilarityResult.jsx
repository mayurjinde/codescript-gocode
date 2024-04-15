import { DiffEditor } from "@monaco-editor/react";
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material"
import { useState } from "react";


export const SimilarityResult=({result})=>{

    const [open, setOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
  const [left,setLeft]=useState('')
  const [right,setRight]=useState('')
  const [sim,setSim]=useState(0)
  const [lName,setLName]=useState('')
  const [rName,setRName]=useState('')
 

  console.log('resulttttt',result)

  const handleOpenDialog = (ele) => {
    setLeft(ele.leftCode)
    setRight(ele.rightCode)
    setSim(ele.similarity)
    setLName(ele.leftFileName)
    setRName(ele.rightFileName)
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    // setSelectedFile(null);
  };



return <>
<div>
      <Grid container spacing={2}>
        {result.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {item.leftFileName}
                </Typography>
                <Typography variant="h5" component="h2">
                  {item.rightFileName}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Similarity Score: {item.similarity.toFixed(2)*100} %
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog(item)}>
                  Dialogue
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}


      </Grid>
      <Dialog open={open} fullScreen onClose={handleCloseDialog}>
        <DialogTitle>Plag Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Typography variant="h5" component="h2">
                  {lName}
                </Typography>
                <Typography variant="h5" component="h2">
                  {rName}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Similarity Score: {sim.toFixed(2)*100 } %
                </Typography>
          </DialogContentText>
          <DiffEditor
           height={'50vh'}
           original={left}
           modified={right}
           theme="vs-dark"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
</>

}