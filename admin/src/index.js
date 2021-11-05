import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Loader from "./components/Loader";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss";
import "./assets/css/custom.css";
import "react-confirm-alert/src/react-confirm-alert.css";

const Toaster = React.lazy(() => import("./components/Toast"));
const AdminLayout = React.lazy(() => import("./layouts/Admin.jsx"));
const LoginLayout = React.lazy(() => import("./layouts/Login.jsx"));



ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Suspense fallback={<div className="loader active" />}>
                <Switch>
                    <Route path="/login" render={(props) => <LoginLayout {...props} />} />
                    <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                    <Redirect to="/admin/dashboard" />
                </Switch>
            </Suspense>
        </Router>

        <Loader />
        <Suspense fallback={<div className="loader active" />}>
            <Toaster />
        </Suspense>
    </React.StrictMode>,
    document.getElementById("root")
);
