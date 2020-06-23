import React, { Fragment } from 'react';
import Title from './Title';
import { Divider, IconButton } from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';


interface ToolBarProps {
    onUndo: () => void
    onRedo: () => void
    disabledUndo: boolean,
    disabeldRedo: boolean

}

export default function ToolBar(props: ToolBarProps) {
    return (
        <Fragment>
            <Title>Toolbar</Title>
            <div>
                <IconButton disabled={props.disabledUndo} onClick={props.onUndo} >
                    <UndoIcon />
                </IconButton>
                <IconButton disabled={props.disabeldRedo} onClick={props.onRedo}>
                    <RedoIcon  />
                </IconButton>
            </div>
            <Divider></Divider>
        </Fragment>
    )
}