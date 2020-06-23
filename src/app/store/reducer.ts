import { AppState } from "../model/appState"
import { initialState } from "./store";

export function undoable(state: AppState = initialState, action: any): AppState {
    const boxes = state.boxes;
    switch (action.type) {
        case 'UNDO': {
            const { past, present, future } = boxes.filter(s => s.url = action.id)[0]
            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)
            const index = boxes.findIndex(b => b.url = action.id)
            const newBoxes = [...boxes]
            newBoxes.splice(index, 1)
            newBoxes.push({
                url: action.id,
                past: newPast,
                present: previous,
                future: [present, ...future]
            })
            return {
                boxes: newBoxes
            }
        }
        case 'REDO': {
            const { past, present, future } = boxes.filter(s => s.url = action.id)[0]
            const next = future[0]
            const newFuture = future.slice(1)
            const index = boxes.findIndex(b => b.url = action.id)
            const newBoxes = [...boxes]
            newBoxes.splice(index, 1)
            newBoxes.push({
                url: action.id,
                past: [...past, present],
                present: next,
                future: newFuture
            })
            return {
                boxes: newBoxes
            }
        }
        case 'ADD':
            return {
                boxes: [...boxes, action.box]
            };
        case 'UPDATE': {
            debugger;
            const index = boxes.findIndex(b => b.url == action.id)
            const newBoxes = [...boxes]
            newBoxes.splice(index, 1)
            return {
                boxes: [...newBoxes, action.box]
            }
        }
        default:
            return state

    }
}