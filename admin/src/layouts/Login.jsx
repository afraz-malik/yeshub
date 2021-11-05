import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import auth from "./../api/auth";

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.replace("/admin/communities");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    auth.login(user).then((response) => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userType", response.role.toLowerCase());

      history.replace("/admin/communities");
    });
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-page">
      <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
        <div className="container">
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button type="button" className="navbar-toggler">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <Link className="navbar-brand" to="/">
              YesHub
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navigation"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
          </button>
        </div>
      </nav>

      <div className="wrapper wrapper-full-page login__bg">
        <div className="content">
          <div className="container">
            <div className="col-lg-4 col-md-6 ml-auto mr-auto">
              <form className="form" onSubmit={handleLogin}>
                <div className="card card-login">
                  <div className="card-header ">
                    <div className="card-header ">
                      <h3 className="header text-center">Login</h3>
                    </div>
                  </div>
                  <div className="card-body ">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="nc-icon nc-single-02"></i>
                        </span>
                      </div>
                      <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email..."
                      />
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="nc-icon nc-key-25"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        onChange={handleChange}
                        name="password"
                        placeholder="Password"
                        className="form-control"
                      />
                    </div>
                    <br />
                  </div>
                  <div className="card-footer ">
                    <button className="btn btn-warning btn-round btn-block mb-3">
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
