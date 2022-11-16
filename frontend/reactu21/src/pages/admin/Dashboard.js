import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const Dashboard = () => {
    return (
        <div className='wrapper'>

            <Navbar></Navbar>
            <Sidebar></Sidebar>

            <div className="content-wrapper">

                <Header
                    title={"Home"}
                    module= {"Dashboard"} >

                </Header>

                <section className="content">



                </section>
            </div>

            <Footer></Footer>

        </div>
    )
}

export default Dashboard;