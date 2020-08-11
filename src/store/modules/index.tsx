import me, { meSaga } from "./me";
import posting from "./posting";
import todos from "./todos";
import counter from "./counter";
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({ me, counter, todos, posting });
export function* rootSaga() {
  yield all([meSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
