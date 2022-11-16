

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import APIInvoke from '../../../utils/APIInvoke';

const ViewUser = () => {

    let navigate = useNavigate();
    const { id } = useParams();

    const [ user, setUser ] = useState(
        {
            name:'',
            email:'',
            password:'',
            confirm: ''
        }
    );

    const { name, email, password, confirm } = user;


    useEffect(() => {
        
        async function loadUser(){
            const response = await APIInvoke.invokeGET(`/user/${id}`);
            setUser( response );
            return;
        }
        
        loadUser();
        document.getElementById("name").focus();

    }, [])
    

  return (
    <div className='wrapper'>
        
    <Navbar></Navbar>
    <Sidebar></Sidebar>

    <div className="content-wrapper">

        <Header
            title={"View user"}
            module={"user"}>

        </Header>

        <section className="content">

                    <div>
                        <div className="row">
                            <div className="offset-2 col-md-8">

                                <div className="card card-primary">

                                    <div className="card-header">
                                        <h3 className="card-title">User info</h3>
                                    </div>
                                    <div className="card-body">

                                        <div className="form-group">
                                            <label htmlFor="title">User name</label>
                                            <input type="text" disabled
                                            id="name" 
                                            name="name" 
                                            className="form-control"
                                            value={ name }
                                            required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="title">User email</label>
                                            <input type="text"  disabled
                                            id="email" 
                                            name="email" 
                                            className="form-control"
                                            value={ email }
                                            required />
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="title">User password</label>
                                            <input type="text" disabled
                                            id="password" 
                                            name="password" 
                                            className="form-control"
                                            value={ password }
                                            required />
                                        </div>

                                        <div className="offset-4 col-md-4">
                                            <Link to={"/admin/users"} className="btn btn-secondary">Cancel</Link>
                                            &nbsp;
                                            <Link to={`/admin/users/edit/${id}`} className="btn btn-warning"> Edit </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                            
                    </div>
            
        </section>

    </div>

    <Footer></Footer>

</div>
  )
}

export default ViewUser