import me from "./me";
import todos from "./todos";
import counter from "./counter";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ me, counter, todos });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
