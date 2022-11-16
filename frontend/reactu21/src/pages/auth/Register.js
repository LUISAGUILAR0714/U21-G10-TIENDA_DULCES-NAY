import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const Register = () => {
    
    const [ user, setUser ] = useState(
        {
            name:'',
            email:'',
            password:'',
            confirm: ''
        }
    );

    const { name, email, password, confirm } = user;
    
    const onChange = ( event ) => {
        setUser(
            {
                ...user,
                [ event.target.name ] : event.target.value
            }
        );
    }

    const saveUser = async () =>{

        if( password !== confirm ){
            swal({
                title: 'Error',
                icon: 'error',
                text: 'Password must match',
                dangerMode: true,
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
            
        }else{

            const data = {
                name : user.name,
                email: user.email,
                password: user.password
            };
            const response = await APIInvoke.invokePOST(`/user/save`, data);
            console.log( response );

            if( response.message === 'User is already registered' ){

                swal({
                    title: 'User exists!',
                    icon: 'warning',
                    text: 'User is already registered',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-warning',
                            closeModal: true
                        }
                    }
                });

            }else{

                swal({
                    title: 'Success!',
                    icon: 'success',
                    text: 'User registered',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-success',
                            closeModal: true
                        }
                    }
                });

                setUser(
                    {
                        name:'',
                        email:'',
                        password:'',
                        confirm: ''
                    }
                );
            }

        }
    }

    useEffect(() => {
        document.getElementById("name").focus();
    }, []);

    const onSubmit = ( event ) => {
        event.preventDefault();
        saveUser();
    }

    return (
        <div className="hold-transition register-page">

            <div className="register-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <Link to={"#"} className="h1"><b>New account</b> </Link>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Register a new account</p>

                        <form onSubmit={ onSubmit }>

                            <div className="input-group mb-3">
                                <input type="text" 
                                className="form-control" 
                                placeholder="Full name"
                                id="name"
                                name="name"
                                value={ name }
                                onChange={ onChange }
                                required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="email" 
                                className="form-control" 
                                placeholder="Email"
                                id="email"
                                name="email"
                                value={ email }
                                onChange={ onChange }
                                required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Password" 
                                id="password"
                                name="password"
                                value={ password }
                                onChange={ onChange }
                                required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" 
                                className="form-control" 
                                placeholder="Retype password"
                                id="confirm"
                                name="confirm" 
                                value={ confirm }
                                onChange={ onChange }
                                required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="social-auth-links text-center">
                                <button type="submit" className="btn btn-block btn-primary">
                                    Register
                                </button>
                                <Link to={"/"} className="btn btn-block btn-danger">
                                    Back
                                </Link>
                                </div>

                        </form>

                    </div>
                </div>
            </div>

        </div>
    );

};

export default Register;