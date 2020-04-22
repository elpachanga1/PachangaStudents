import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import reducers from "./Reducers";
import { loadState, saveState } from "./Config/PersistStateFromStore";
const initialData = loadState() || {};

//convocando el store se realiza el llamado al almacenamiento global de informacion de REDUX
const store = createStore(
  reducers,
  initialData, //estado inicial
  applyMiddleware(reduxThunk)
);

store.subscribe(function () {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
