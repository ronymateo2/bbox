import { Rectangle } from "./rectangle";

export interface Box {
    url: string
    past: Rectangle[],
    present: Rectangle
    future: Rectangle[]
}
