import React from 'react'
import Layout from './components/Layout/Layout'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import SignupPage from './pages/auth/SignupPage'
import LoginPage from './pages/auth/LoginPage'
import { axiosInstance } from "./lib/axois.js";
import { useQuery } from "@tanstack/react-query";
import { Toaster,toast } from 'react-hot-toast'
import {Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import { Network } from 'lucide-react'
import Networkpage from './pages/Networkpage.jsx'
import PostPage from './pages/PostPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'



export default function App() {
  const { data: authUser, isLoading } = useQuery({
  queryKey: ["authUser"],
  queryFn: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null; 
    }
    try {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        return null; 
      }
      toast.error(err.response.data.message || "Something went wrong");
    }
  },
});
if (isLoading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <span>Loading...</span> 
    </div>
  );
}
  return (
    <Layout>
      <Routes>
        <Route path='/' element={authUser ?<HomePage/> : <Navigate to={'/login'}/>}/>
        <Route path='/signup' element={!authUser ?<SignupPage/> : <Navigate to={'/'}/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}/>
        <Route path='/notifications' element={authUser ? <NotificationsPage /> : <Navigate to={"/login"} />} />
        <Route path='/network' element={authUser ? <Networkpage/> : <Navigate to={'/login'}/>}/>
        <Route path='/post/:postId' element={authUser ? <PostPage/> : <Navigate to={'/login'}/>}/>
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
      </Routes>
      <Toaster/>
    </Layout>
  )
}
