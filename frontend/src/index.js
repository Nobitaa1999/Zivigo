import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './component/Layout';
import Home from './Pages/Home';
import Author from './Pages/Author';
import AuthorPost from './Pages/AuthorPost';
import CategoryPost from './Pages/CategoryPost';
import CreatePost from './Pages/CreatePost';

import Login from './Pages/Login';
import PostDetail from './Pages/PostDetail';
import ErrorPage from './Pages/ErrorPage'
import Register from './Pages/Register';
import UserProfile from './Pages/UserProfile';
import Logout from './Pages/Logout';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import Edit from './Pages/Edit';
import Delete from './Pages/Delete';
import UserProvider from './context/userContext';


const router=createBrowserRouter([
  {
    path:"/",
    element:<UserProvider><Layout/></UserProvider>,
    errorElement:<ErrorPage/>,  
  children:[
    { path:"",element:<Home/>},

    { path:"authors", element:<Author/> },

    { path:"posts/user/:id", element:<AuthorPost/> },

    { path:"posts/categories/:category", element:<CategoryPost/> },

    { path:"create", element:<CreatePost/> },

    { path:"mypost/:id", element:<Dashboard/> },

    { path:"login", element:<Login/> },

    { path:"post/:id", element:<PostDetail/> },

    { path:"post/:id/edit", element:<Edit/> },
   
    { path:"post/:id/delete", element:<Delete/> },

    { path:"logout", element:<Logout/> },

    { path:"profile/:id", element:<UserProfile/> },

    { path:"register", element:<Register/> },
        
  ]
}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);



