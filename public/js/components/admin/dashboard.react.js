import React from 'react';
import { Link } from 'react-router';
import Header from './Header.react';
import Sidebar from './Sidebar.react';
import Cards from './Cards.react';
import Settings from './Settings.react';
import Path from './path.react';

var Admin = React.createClass({
    render: function () {
        return (
            <div>
                <div className="hold-transition skin-blue sidebar-mini">
                    <div className="wrapper">
                        <Header/>
                        <Sidebar/>

                        <div className="content-wrapper">
                            <Path/>
                            <section className="content">
                                <Cards/>
                            </section>
                        </div>
                        <Settings />
                    </div>
                </div>
            </div>
        );
    }
});
export default Admin;