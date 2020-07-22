import { createStore } from "redux";
import modules from "./modules";
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구

const configure = () => {
  const store = createStore(modules, composeWithDevTools());
  return store;
};

export default configure;
