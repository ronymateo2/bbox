import { createStore } from "redux";
import { Box } from "../model/box"
import { undoable } from "./reducer";
import { AppState } from "../model/appState";

export const initialState: AppState = {
    boxes: [] as Box[],
}

export const store = createStore(undoable,  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)