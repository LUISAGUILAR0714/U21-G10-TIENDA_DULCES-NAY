
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import APIInvoke from '../../../utils/APIInvoke'

const CreatePost = () => {

    let navigate = useNavigate();

    const [ post, setPost ] = useState(
        {
            title:'',
            content:'',
            status:''
        }
    );

    const { title, content, status } = post;

    const onChange = (e) => { 
        setPost(
            {
                ...post,
                [ e.target.name ] : e.target.value
            }
        );
    }

    const onSubmit = (e) => { 
        e.preventDefault();
        savePost(); 
    }

    const savePost = async () => { 
        const data = {
            title: post.title,
            content: post.content,
            status: post.status
        }

        const response = await APIInvoke.invokePOST(`/post/save`, data);

        if (response.message === "Post created"){

            swal({
                title: 'Post created',
                icon: 'success',
                text: `Post created successfully`,
                buttons: {
                    confirm: {
                        text: 'Close',
                        value: true,
                        visible: true,
                        className: 'btn btn-success',
                        closeModal: true
                    }
                }
            }).then(
                navigate('/admin/posts')
            );

        }else{
            console.log(response.error)
            swal({
                title: 'Unknown error',
                icon: 'error',
                text: 'Unknown error',
                buttons: {
                    confirm: {
                        text: 'Close',
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
        document.getElementById("title").focus();
    },[])

    return (
        <div className='wrapper'>
            
        <Navbar></Navbar>
        <Sidebar></Sidebar>

        <div className="content-wrapper">

            <Header
                title={"Create post"}
                module={"post"}>

            </Header>

            <section className="content">

                <form onSubmit={ onSubmit }>
                    <div>
                        <div className="row">
                            <div className="offset-2 col-md-8">

                                <div className="card card-primary">

                                    <div className="card-header">
                                        <h3 className="card-title">Create new Post</h3>
                                    </div>
                                    <div className="card-body">

                                        <div className="form-group">
                                            <label htmlFor="title">Post title</label>
                                            <input type="text" 
                                            id="title" 
                                            name="title" 
                                            className="form-control"
                                            value={ title }
                                            onChange = { onChange }
                                            required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="content">Post content</label>
                                            <textarea id="content" name="content" 
                                            className="form-control" 
                                            rows={4} 
                                            value={ content }
                                            onChange = { onChange }
                                            required/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select id="status" name="status" 
                                            className="form-control custom-select"
                                            value={ status }
                                            onChange = { onChange }
                                            required >
                                                <option value={""} selected disabled>Select one</option>
                                                <option value={"Published"}> Published</option>
                                                <option value={"On review"}> On review</option>
                                                <option value={"Draft"}> Draft</option>
                                            </select>
                                        </div>
                        
                                        <div className="offset-4 col-md-4">
                                            <Link to={"/admin/posts"} className="btn btn-secondary">Cancel</Link>
                                            &nbsp;
                                            <button type='submit' className="btn btn-success"> Create </button>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                            
                    </div>
                </form>
            </section>

        </div>

        <Footer></Footer>

        </div>
    )
}

export default CreatePost