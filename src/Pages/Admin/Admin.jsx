import React from 'react'
import './Admin.css'
import { Routes,Route } from 'react-router-dom'
import Sidebar from '../../Component/Sidebar/Sidebar'
import AddProduct from '../../Component/AddProduct/AddProduct'
import ListProduct from '../../Component/ListProduct/ListProduct'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>} />
        <Route path='/listproduct' element={<ListProduct/>} />
      </Routes>
    </div>
  )
}

export default Admin
