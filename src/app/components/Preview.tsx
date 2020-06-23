import React, { Fragment } from 'react';
import Title from "./Title";
import { Divider, Button, makeStyles, Box } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme)=>({
    list :{
        'overflow-x': "hidden",
        'overflow-y':"scroll"
    }
}))

interface PreviewProps {
    imgList : string[],
    onChanged : (img: string) => void
}

export default function Preview(props : PreviewProps) {
    const classes = useStyles();


    function handleListItemClick(img: string){
        props.onChanged(img)
    }

    const listImgs = props.imgList.map(img => (<ListItem button key={img} 
        onClick={() => handleListItemClick(img)}
        >
        <img src={img} width="100px" height="40px"></img>
    </ListItem>));

    return (
        <Fragment>
            <Title>Preview</Title>
            {/* <Divider></Divider> */}
            <div className={classes.list}>
                <List component="nav" aria-label="main mailbox folders">
                    {listImgs}
                </List>
            </div>
            <Divider></Divider>
            <Box m={3} justifyContent="center" display="flex">
            <Button variant="contained" color="primary">
                    SUBMIT
                </Button>
            </Box>
        </Fragment>
    )
}