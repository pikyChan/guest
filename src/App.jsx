import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/admin/Home'
import AuthLayout from './layout/AuthLayout'
import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'
import Users from './pages/admin/Users'
import './App.css'
import BukuTamu from './pages/admin/BukuTamu'
import Profile from './pages/admin/Profile'
import User from './pages/users/Contact'
import AddUsers from './pages/admin/AddUsers'
import AddBukutamu from './pages/admin/AddBukutamu'
import EditUsers from './pages/admin/EditUsers'
import EditTamu from './pages/admin/EditTamu'
import TampilData from './pages/users/TampilData'
import Test from './pages/users/test'


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/test' element={<Test/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/logout' element={<Logout/>}></Route>
      <Route path='/' element={<User/>}></Route>
      <Route path='/datatamu' element={<TampilData/>}></Route>
      <Route path="/admin/*" element={<Layout/>}>
        <Route path="dashboard" element={<Home/>} />
        <Route path="users" element={<Users/>} />
        <Route path="edituser/:id" element={<EditUsers/>} />
        <Route path="addusers" element={<AddUsers/>} />
        <Route path="bukutamu" element={<BukuTamu/>} />
        <Route path="edittamu/:id" element={<EditTamu/>} />
        <Route path="addtamu" element={<AddBukutamu/>} />
        <Route path="profile" element={<Profile/>} />
      </Route>
      
    </Routes>
    </BrowserRouter>

    
  )
}

export default App
