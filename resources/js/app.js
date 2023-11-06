import React from "react";
import { Router } from "react-router-dom";
import Main from "./components/App";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { render } from "react-dom";
import history from "./history";
import "react-confirm-alert/src/react-confirm-alert.css";

const store = configureStore();

render(
    <ReduxProvider store={store}>
        <Router history={history}>
            <Main component={Main} />
        </Router>
    </ReduxProvider>,
    document.getElementById("index")
);
