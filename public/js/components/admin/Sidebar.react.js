/**
 * Created by Isuru 1 on 21/01/2016.
 */

import React from 'react';
import { Link } from 'react-router';

var Sidebar = React.createClass({
    render: function () {
        return (
            <div>
                <aside className="main-sidebar">

                    <section className="sidebar">

                        <div className="user-panel">
                            <div className="pull-left image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                            </div>
                            <div className="pull-left info">
                                <p>Isuru Dilhan</p>
                                <a>
                                    <i className="fa fa-circle text-success"></i>
                                    Online</a>
                            </div>
                        </div>

                        <form action="#" method="get" className="sidebar-form">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search.."/>
                                <span className="input-group-addon">
                                    <i className="fa fa-search"></i>
                                </span>
                            </div>
                        </form>

                        <ul className="sidebar-menu">
                            <li className="header">MAIN NAVIGATION</li>
                            <li>
                                <Link to={`/cards`}>
                                    <i className="fa fa-dashboard"></i>
                                    <span>Dashboard</span>
                                </Link>

                            </li>

                            <li>
                                <Link to={`/users`}>
                                    <i className="fa fa-th"></i>
                                    <span>Privacy</span>
                                    <small className="label pull-right bg-green">new</small>
                                </Link>
                            </li>

                            <li>
                                <Link to={`/settings`}>
                                    <i className="fa fa-calendar"></i>
                                    <span>Feedbacks</span>
                                    <small className="label pull-right bg-red">3</small>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/settings`}>
                                    <i className="fa fa-envelope"></i>
                                    <span>Mailbox</span>
                                    <small className="label pull-right bg-yellow">12</small>
                                </Link>
                            </li>
                            <li className="treeview">
                                <Link to={`/settings`}>
                                    <i className="fa ion-ios-gear"></i>
                                    <span>Settings</span>
                                </Link>

                            </li>

                        </ul>
                    </section>

                </aside>
            </div>
        );
    }
});

export default Sidebar;
