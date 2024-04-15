import { ListItem, ListItemText, Typography } from "@mui/material"


export const PlagCard=(props)=>{

 
    return <>
      <ListItem >

  <ListItemText>
    <Typography variant="body1">
    <a href={props.link} target="_blank">{props.link}</a>
    </Typography>

    <Typography variant="body2" color={'white'}>
     {100*props.similarity.toFixed(2)} %
    </Typography>
  </ListItemText>

      </ListItem>
      
    </>

}