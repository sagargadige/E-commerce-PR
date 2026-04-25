import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './components/Home'
import Products from './components/Products'
import Contact from './components/Contact'
import Cart from './components/Cart'
import AdminDashboard from './components/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path='/admin' element={<ProtectedRoute adminOnly={true}><AdminDashboard/></ProtectedRoute>}/>
      </Routes>
      <ToastContainer position='top-right' autoClose={2500} theme='colored' />
    </>
  )
}

export default App
