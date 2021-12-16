import React from "react";
import App from "./App.js";
import store from "./store";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);
