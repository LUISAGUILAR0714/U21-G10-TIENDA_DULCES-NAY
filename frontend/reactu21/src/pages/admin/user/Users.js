import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import APIInvoke from '../../../utils/APIInvoke';

const Users = () => {

    const [users, setUsers] = useState(
        []
    );

    const loadUsers = async () => {
        const response = await APIInvoke.invokeGET(`/user/list`);
        setUsers(response);
    }

    const deleteUser = async (e, id) => {

        e.preventDefault();

        swal({
            title: 'Delete user',
            icon: 'error',
            text: 'Are you sure you want to delete this user?',
            buttons: {
                confirm: {
                    text: 'Delete',
                    value: true,
                    visible: true,
                    className: 'btn btn-danger',
                    closeModal: true
                },
                cancel: {
                    text: 'Cancel',
                    value: false,
                    visible: true,
                    className: 'btn btn-primary',
                    closeModal: true
                }
            }
        }).then(async (value) => {

            if (value) {

                const response = await APIInvoke.invokeDELETE(`/user/${id}`)

                swal({
                    title: 'Delete user',
                    icon: 'success',
                    text: 'User deleted successfully',
                    buttons: {
                        confirm: {
                            text: 'Close',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                });

                loadUsers();
            }
        })


    }


    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className='wrapper'>

            <Navbar></Navbar>
            <Sidebar></Sidebar>

            <div className="content-wrapper">

                <Header
                    title={"List users"}
                    module={"Users"} >
                </Header>

                <section className="content">
                    <Link to={"/admin/users/create"} className="btn btn-sm btn-success">Create user</Link>
                    <br/> <br/>
                    <table className="table table-striped projects">
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}> Name </th>
                                <th style={{ width: '30%' }}> Email </th>
                                <th> Password </th>
                                <th style={{ width: '8%' }} className="text-center"> Updated </th>
                                <th style={{ width: '20%' }}> </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users.map(
                                    item =>
                                        <tr key={item._id}>
                                            <td> {item.name} </td>
                                            <td> {item.email} </td>
                                            <td className="project_progress"> {item.password.substring(0, 10)} ... </td>
                                            <td className="project-state"> {item.updatedAt} </td>
                                            <td className="project-actions text-right">
                                                <Link className="btn btn-primary btn-sm" to={`/admin/users/view/${ item._id }`} title='View'>
                                                    <i className="fas fa-eye">
                                                    </i>
                                                </Link>
                                                &nbsp;&nbsp;
                                                <Link className="btn btn-info btn-sm" to={"#"} title='Edit'>
                                                    <i className="fas fa-pencil-alt">
                                                    </i>
                                                </Link>
                                                &nbsp;&nbsp;
                                                <button className="btn btn-danger btn-sm"
                                                    onClick={(e) => { deleteUser(e, item._id) }} title='Delete'>
                                                    <i className="fas fa-trash"> </i>
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }


                        </tbody>
                    </table>

                </section>
            </div>

            <Footer></Footer>

        </div>
    )
}

export default Users;