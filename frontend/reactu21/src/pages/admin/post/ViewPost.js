
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import Navbar from '../../../components/Navbar'
import Sidebar from '../../../components/Sidebar'
import APIInvoke from '../../../utils/APIInvoke'

const ViewPost = () => {

    let navigate = useNavigate();

    const { id } = useParams();

    const [ post, setPost] = useState({
        _id:'',
        title: '',
        content: '',
        status: '',
        user:''
    })
  
    const { _id, title, content, status, user } = post;

    useEffect(() => {
        
        async function loadPost(){
            const response = await APIInvoke.invokeGET(`/post/${id}`);
            setPost( response );
            return;
        }
        
        loadPost();
        document.getElementById("title").focus();

    }, [])
    

    return (
        <div className='wrapper'>

            <Navbar></Navbar>
            <Sidebar></Sidebar>

            <div className="content-wrapper">

                <Header
                    title={"View post"}
                    module={"post"}>

                </Header>

                <section className="content">

                        <div>
                            <div className="row">
                                <div className="offset-2 col-md-8">

                                    <div className="card card-primary">

                                        <div className="card-header">
                                            <h3 className="card-title">Post info</h3>
                                        </div>
                                        <div className="card-body">

                                            <div className="form-group">
                                                <label htmlFor="id">Post ID</label>
                                                <input type="text" disabled
                                                    id="id"
                                                    name="id"
                                                    className="form-control"
                                                    value={ _id }
                                                    required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="title">Post title</label>
                                                <input type="text" disabled
                                                    id="title"
                                                    name="title"
                                                    className="form-control"
                                                    value={title}
                                                    required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="content">Post content</label>
                                                <textarea id="content" name="content" disabled
                                                    className="form-control"
                                                    rows={4}
                                                    value={content}
                                                    required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="status">Status</label>
                                                <input type="text" id="status" name="status" disabled
                                                    className="form-control custom-select"
                                                    value={status}
c                                                    required >
                                                </input>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="user">Post User</label>
                                                <input type="text" disabled
                                                    id="user"
                                                    name="user"
                                                    className="form-control"
                                                    value={ user }
                                                    required />
                                            </div>

                                            <div className="offset-4 col-md-4">
                                                <Link to={"/admin/posts"} className="btn btn-secondary">Cancel</Link>
                                                &nbsp;
                                                <Link to={`/admin/posts/edit/${ id }`} className="btn btn-warning"> Edit </Link>
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

export default ViewPost