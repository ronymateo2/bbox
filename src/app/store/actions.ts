import { Rectangle } from '../model/rectangle'
import { Box } from '../model/box'

export const undo = (id: string) => {
    return {
        type: "UNDO",
        id
    }
}


export const redo = (id: string) => {
    return {
        type: "REDO",
        id
    }
}

export const add = (box: Box) => {
    return {
        type: 'ADD',
        id: box.url,
        box
    }
}

export const update = (box: Box) => {
    return {
        type: 'UPDATE',
        id: box.url,
        box
    }
}

