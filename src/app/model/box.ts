import { Rectangle } from "./rectangle";

export interface Box {
    url: string
    past: Rectangle[],
    present: Rectangle
    future: Rectangle[]
}


export function canRedo(box: Box) {
    return box && box.future.length > 0
}

export function candUndo(box: Box) {
    return box && ( box.past.length > 0 || box.present)
}