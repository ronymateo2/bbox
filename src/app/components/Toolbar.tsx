import React, { Fragment } from 'react';
import Title from './Title';
import { Divider, IconButton } from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';


interface ToolBarProps {
    onUndo: () => void
}

export default function ToolBar(props: ToolBarProps) {
    return (
        <Fragment>
            <Title>Toolbar</Title>
            <div>
                <IconButton>
                    <UndoIcon onClick={props.onUndo} />
                </IconButton>
                <IconButton>
                    <RedoIcon />
                </IconButton>
            </div>
            <Divider></Divider>
        </Fragment>
    )
}