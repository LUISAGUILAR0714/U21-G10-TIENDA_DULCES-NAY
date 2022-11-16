

import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

const Blank = () => {
  return (
    <div className='wrapper'>
        
        <Navbar></Navbar>
        <Sidebar></Sidebar>

        <div className="content-wrapper">

            <Header
                title={"Blank"}
                module={"Blank"}>

            </Header>

            <section className="content">

            </section>

        </div>

        <Footer></Footer>

    </div>
  )
}

export default Blank