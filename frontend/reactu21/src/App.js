import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import CreatePost from './pages/admin/post/CreatePost';
import EditPost from './pages/admin/post/EditPost';
import Posts from './pages/admin/post/Posts';
import ViewPost from './pages/admin/post/ViewPost';
import CreateProducts from './pages/admin/products/CreateProducts';
import EditProducts from './pages/admin/products/EditProducts';
import Products from './pages/admin/products/Products';
import ViewProducts from './pages/admin/products/ViewProducts';

import CreateUser from './pages/admin/user/CreateUser';
import Users from './pages/admin/user/Users';
import ViewUser from './pages/admin/user/ViewUser';
import Login from './pages/auth/Login';
import Profile from './pages/auth/Profile';
import Register from './pages/auth/Register';
import Home from './pages/Home';

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' exact element={ <Home /> } />
          <Route path='/login' exact element={ <Login /> } />
          <Route path='/register' exact element={ <Register /> } />
          <Route path='/profile' exact element={ <Profile /> } />

          <Route path='/admin/' exact element={ <Dashboard /> } />
          <Route path='/admin/users/view/:id' exact element={ <ViewUser /> } />
          <Route path='/admin/users' exact element={ <Users /> } />
          <Route path='/admin/users/create' exact element={ <CreateUser /> } />

          <Route path='/admin/posts' exact element={ <Posts /> } />
          <Route path='/admin/posts/view/:id' exact element={ <ViewPost /> } />
          <Route path='/admin/posts/create' exact element={ <CreatePost /> } />
          <Route path='/admin/posts/edit/:id' exact element={ <EditPost /> } />

        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
