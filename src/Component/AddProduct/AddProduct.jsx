import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { json } from 'react-router-dom';
const AddProduct = () => {
    const [image,setImage]=useState(false);
    const[productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"",
        new_price:"",
        old_price:""
    })
    const imageHandle=(e)=>{
        setImage(e.target.files[0]);
    }
    const changeHandler=(e)=>{
        setProductDetails({
            ...productDetails,[e.target.name]:e.target.value
        })
    }
    const AddProduct=async()=>{
        console.log(productDetails)
        let responeData;
        let product=productDetails;
        let formData=new FormData();
        formData.append('product',image);
        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json'
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responeData=data})
        if(responeData.success){
            product.image=responeData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-type':'application/json',
                },
                body:JSON.stringify(product)
            }).then((res)=>res.json()).then((data)=>{
                data.success?alert('Product Added'):alert("Failed")
            })
        }
    }
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" id="" placeholder='Product Title'/>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Old Price' />
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Offer Price' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" id="" className='add-product-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image? URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
        </label>
        <input onChange={imageHandle} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{AddProduct()}} className='addproduct-btn'>Add</button>
    </div>
  )
}

export default AddProduct
