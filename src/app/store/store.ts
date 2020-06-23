import { createStore } from "redux";
import { Box } from "../model/box"
import { undoable } from "./reducer";
import { AppState } from "../model/appState";

export const initialState: AppState = {
    boxes: [] as Box[]
}

export const store = createStore(undoable)