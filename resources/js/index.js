import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Main from "./components/App";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { render } from "react-dom";

const store = configureStore();

render(
    <ReduxProvider store={store}>
        <BrowserRouter>
            <Main component={Main} />
        </BrowserRouter>
    </ReduxProvider>,
    document.getElementById("index")
);
