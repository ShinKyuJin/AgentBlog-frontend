import { createStore, applyMiddleware } from "redux";
import modules, { rootSaga } from "./modules";
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const configure = () => {
  const store = createStore(
    modules,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configure;
