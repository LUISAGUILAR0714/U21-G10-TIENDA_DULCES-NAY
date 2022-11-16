import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const Login = () => {

    let navigate = useNavigate();

    const [ user, setUser ] = useState(
        {
            email:'',
            password:''
        }
    );
    
    const { email, password } = user;

    const onChange = ( event ) => {
        setUser(
            {
                ...user,
                [ event.target.name ] : event.target.value
            }
        );
    }

    const login = async () => {
        
        const data = {
            email: user.email,
            password: user.password
        };
        const response = await APIInvoke.invokePOST(`/auth/login`, data);

        if( response.message === "Invalid credentials"){
            
            swal({
                title: 'Invalid user',
                icon: 'error',
                text: `You don't have and account `,
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

        } else if ( response.message === "Invalid Password"){

            swal({
                title: 'Incorrect Password',
                icon: 'error',
                text: 'Your password is incorrect',
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

        } else if ( response.message === "Authentication successful"){

            localStorage.setItem('token', response.token);
            navigate('/admin');
            
        } else {
            swal({
                title: 'Unknown error',
                icon: 'error',
                text: 'Unknown error',
                buttons: {
                    confirm: {
                        text: 'Back',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }

    }

    useEffect(() => {
        document.getElementById("email").focus();
    }, []);

    const onSubmit = ( event ) => {
        event.preventDefault();
        login();
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <Link to={"#"} className="h1"><b>Log in</b></Link>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        
                        <form onSubmit={ onSubmit }>

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
                                <input type="password" 
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
                
                            <div className="social-auth-links text-center mt-2 mb-3">
                                <button type="submit" className="btn btn-block btn-primary">
                                    Log in 
                                </button>
                                <Link to={"/register"} className="btn btn-block btn-success">
                                    Register
                                </Link>
                            </div>

                        </form>
                    
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;