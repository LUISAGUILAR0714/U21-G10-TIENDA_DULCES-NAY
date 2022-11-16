import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import APIInvoke from '../../utils/APIInvoke'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import swal from 'sweetalert'

const Posts = () => {

    const [posts, setPosts] = useState(
        []
    );

    const loadPosts = async () => {
        const response = await APIInvoke.invokeGET(`/post/list`);
        setPosts(response);
    }


    const deletePost = async (e, id) => {

        e.preventDefault();

        swal({
            title: 'Deleted post',
            icon: 'error',
            text: `Are you sure you want to delete this post?`,
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
                    className: 'btn btn-default',
                    closeModal: true
                }
            }
        }).then(async (value) => {

            if (value) {

                const response = await APIInvoke.invokeDELETE(`/post/${id}`);

                if (response.message === "Post deleted") {

                    swal({
                        title: 'Post deleted',
                        icon: 'success',
                        text: `Deleted`,
                        buttons: {
                            confirm: {
                                text: 'Close',
                                value: true,
                                visible: true,
                                className: 'btn btn-success',
                                closeModal: true
                            }
                        }
                    });

                    loadPosts();

                }

            }

        });

    }

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <div className='wrapper'>

            <Navbar></Navbar>
            <Sidebar></Sidebar>

            <div className="content-wrapper">

                <Header
                    title={"List posts"}
                    module={"Posts"} >
                </Header>

                <section className="content">

                    <table className="table table-striped projects">
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}> Title </th>
                                <th style={{ width: '30%' }}> Content </th>
                                <th> Created by </th>
                                <th style={{ width: '8%' }} className="text-center"> Updated </th>
                                <th style={{ width: '20%' }}> </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                posts.map(
                                    item =>
                                        <tr key={item._id}>
                                            <td> {item.title} </td>
                                            <td> {item.content} </td>
                                            <td className="project_progress"> {item.user} </td>
                                            <td className="project-state"> {item.updatedAt} </td>
                                            <td className="project-actions text-right">
                                                <Link className="btn btn-primary btn-sm" to={"#"} title='View'>
                                                    <i className="fas fa-eye"> </i>
                                                </Link>
                                                &nbsp;&nbsp;
                                                <Link className="btn btn-info btn-sm" to={"#"} title='Edit'>
                                                    <i className="fas fa-pencil-alt"> </i>
                                                </Link>
                                                &nbsp;&nbsp;
                                                <button className="btn btn-danger btn-sm"
                                                    onClick={(e) => { deletePost(e, item._id) }} title='Delete'>
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

export default Posts