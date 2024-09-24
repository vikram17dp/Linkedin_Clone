import React from 'react'
import Layout from './components/Layout'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import SignupPage from './pages/auth/SignupPage'
import LoginPage from './pages/auth/LoginPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </Layout>
  )
}
