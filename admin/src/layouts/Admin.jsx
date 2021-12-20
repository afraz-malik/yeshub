import React, { Suspense } from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import smcount from "../api/smcount";
import DemoNavbar from "./../components/Navbars/DemoNavbar.jsx";
import Footer from "./../components/Footer/Footer.jsx";
import Sidebar from "./../components/Sidebar/Sidebar.jsx";
import routes from "./../routes.js";
import { actualRoutes } from "../routes";
import Pusher from "pusher-js";
import ChatStorage from "../helper/chatStorage";
import isAdmin from "../helper/isAdmin";
var ps;
const react_ganalytics_key = "AIzaSyA_Y2Co2u-0V3F9URTtkC1FazKb4UI5ZQc";
const viewID = "229344495";
const initAuth = () => {
  return window.gapi.auth2.init({
    client_id: react_ganalytics_key, //paste your client ID here
    scope: "https://www.googleapis.com/auth/analytics.readonly",
  });
};

const initPusher = () => {
  pusher.subscribe("messages").bind(`msg-to-admin`, (data) => {
    console.log("new msg", data);
    ChatStorage.addNewMessage(data.conversationID, data);

    document.dispatchEvent(new CustomEvent("new-msg", { detail: data }));
  });
};
const pusher = new Pusher("ef1b891d5be96d1323d2", {
  cluster: "ap2",
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      routes: [],
    };
    this.mainPanel = React.createRef();
  }

  componentDidMount() {
    // initAuth();
    if (!localStorage.getItem("token")) {
      return this.props.history.replace("/login");
    }

    initPusher();
    if (isAdmin()) {
      smcount
        .fetch()
        .then((res) => {
          routes.forEach((itm) => {
            if (itm.name === "Case Studies") {
              itm.count = res.casestudies;
            }

            if (itm.name === "Reported") {
              itm.count = res.reports;
            }

            if (itm.name === "Communities") {
              itm.count = res.community;
            }

            if (itm.name === "Events") {
              itm.count = res.events;
            }

            if (itm.name === "Inbox") {
              itm.count = res.inboxCounts;
            }
          });
          this.setState({ routes: routes });
        })
        .catch((err) => console.log(err));
    }

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }

  render() {
    {console.log(this.props.routes)}
    return (
      <div className="wrapper">
        
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <Suspense fallback={<div className="loader active" />}>
            {console.log(actualRoutes)}
            <Switch>
              {actualRoutes.map((prop, key) => (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              ))}
              <Redirect from="/admin/dashboard" to="/admin/communities" />
              <Redirect to="/admin/communities" />
            </Switch>
          </Suspense>
          {/* <Footer fluid /> */}
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
