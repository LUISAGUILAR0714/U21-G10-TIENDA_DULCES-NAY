import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import APIInvoke from '../utils/APIInvoke';

const Sidebar = () => {

    const navigate = useNavigate();

    useEffect( () => {
    
        async function fetchData() {
            const response = await APIInvoke.invokePOST(`/auth/verify`, {} );

            if( response.error !== undefined ){
                navigate('/login');
                return;
            }

            document.getElementById("user").innerHTML = response.message.name;
        }

        fetchData();

    }, []);


    return (
        < aside className="main-sidebar sidebar-dark-primary elevation-4" >
            <Link to={ "#" } className="brand-link" >
                <img src="../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">Mi App</span>
            </Link>
            < div className="sidebar" >
                <div className="user-panel mt-3 pb-3 mb-3 d-flex" >
                    <div className="image">
                        <img src="../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <Link to={ "#" } id="user" className="d-block">Alexander Pierce</Link>
                    </div>
                </div >
                
                <nav className="mt-2" >
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    
                        <li className="nav-item">
                            <NavLink to={ "/admin" } className="nav-link" end>
                            <i className="nav-icon fa fa-home" /> <p>  Home </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={ "/admin/users" } className="nav-link">
                                <i className="nav-icon fa fa-user" /> <p>  Users </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={ "/admin/posts" } className="nav-link">
                                <i className="nav-icon fa fa-book" /> <p>  Posts </p>
                            </NavLink>
                        </li>
                    </ul>
                </nav >
            </div >
        </aside >

    )
}

export default Sidebar;