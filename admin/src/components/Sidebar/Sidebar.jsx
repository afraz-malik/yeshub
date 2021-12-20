import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav, Collapse } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "./../../assets/img/logo.jpg";

var ps;
const lgFonts = {"font-size": "14px"};
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
        this.sidebar = React.createRef();
        this.state = {
            isOpen : false
        }
    }
    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }
    componentDidMount() {
        console.log(this.props);
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.sidebar.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
        }
    }
    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }
    render() {
        return (
            <div className="sidebar" data-color={this.props.bgColor} data-active-color={this.props.activeColor}>
                <div className="logo">
                    <Link to="/" className="simple-text logo-mini">
                        <div className="logo-img">
                            <img src={logo} alt="react-logo" />
                        </div>
                    </Link>
                    <Link to="/" className="simple-text logo-normal">
                        YesHub
                    </Link>
                </div>
                <div className="sidebar-wrapper" ref={this.sidebar}>
                    {console.log(this.props.routes)}
                    <Nav>
                        {this.props.routes.map((prop, key) => {
                            return prop.inSidebar !== false ? (
                                <>
                                
                                {
                                    prop.hasChildren 
                                    ? <li className={this.activeRoute(prop.path) + (prop.pro ? " active-pro" : "")} key={key}>
                                    
                                        <NavLink to={ prop.layout + prop.path} className="nav-link" activeClassName="active">
                                            <i className={prop.icon} />
                                <p>{prop.name}  {prop.count > 0 &&<span className="badge badge-primary" style={lgFonts}>{prop.count}</span>}</p>
                                        </NavLink>
                                    </li>
                                    :<>
                                        <li  onClick={(e) => {e.preventDefault(); this.setState({isOpen: !this.state.isOpen}) }} className="text-primary" key={key}>
                                        
                                            <a class="nav-link">
                                                <i className={prop.icon} /> 
                                                <span>{prop.name}</span>
                                                { !this.state.isOpen ? <span class="fa fa-caret-down custom--icon" />
                                                 : <span class="fa fa-caret-up custom--icon" />
                                                }
                                                
                                            </a>
                                            {/* <NavLink activeClassName="active"> */}
                                                {/* <i className={prop.icon} />
                                                <p>{prop.name}</p> */}
                                            {/* </NavLink> */}
                                        </li> 
                                        <Collapse isOpen={this.state.isOpen} navbar>
                                            {
                                                prop.children.map((_prop, key) => {
                                                    return (
                                                        <li className={this.activeRoute(_prop.path) + (_prop.pro ? " active-pro nested" : " nested")} key={key}>
                                                        
                                                            <NavLink to={ prop.layout + _prop.path} className="nav-link" activeClassName="active">
                                                                <i className={_prop.icon} />
                                                                <p>{_prop.name}</p>
                                                            </NavLink>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </Collapse>
                                    </>
                                }
                                </>
                            ) : null;
                        })}
                    </Nav>
                </div>
            </div>
        );
    }
}

export default Sidebar;
