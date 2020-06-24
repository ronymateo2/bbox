import React from 'react';
import Title from "./Title";
import { Box as BoxModel , apiFormater} from '../model/box';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import TelegramIcon from '@material-ui/icons/Telegram';
interface LogProps {
    list: BoxModel[]
}

export default function Log(props: LogProps) {
    const listImgs = (props.list || []).map(box => (
        <ListItem button key={box.url}>
            <ListItemAvatar>
                <Avatar>
                    <TelegramIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText inset primary={apiFormater(box)} />
        </ListItem>));

    return (
        <React.Fragment>
            <Title>Log</Title>
            <List>
               {listImgs}
            </List>
        </React.Fragment>
    )

}