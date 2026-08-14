import React, { useState } from 'react'
import axios from 'axios'
import { Category } from '@mui/icons-material'

const CreateProduct = () => {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [publicID, setPublicId] = useState('')
  const [description, setDescription] = useState('')
  const [category , setCategory ] = useState('')
  const [image, setImage] = useState(null) // store file object

  const handleSubmit = async (e) => {
    e.preventDefault()
try {
   

  const formData = new FormData()
  formData.append('name' , name)
  formData.append('title' , title)
  formData.append('price' , price)
  formData.append('category' , category)
 
   formData.append('publicID' , publicID)
   formData.append('description' , description)
    if (image) {
        formData.append('image', image) // file object
      }

      const product =  await  axios.post('http://localhost:5000/api/product', formData,{
            withCredentials: true
      })


      console.log(product.data)

      alert("Product created successfully!")


      
    } catch (err) {
        console.error('Error creating product:', err)
      alert('Failed to create product')
      
    }
 
  }

  return (
    <div className="p-4 bg-gray-300 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 w-full max-w-md p-6 shadow-2xl shadow-black rounded-2xl"
      >
        <div className="mb-4">
          <label className="font-bold text-black">Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Product Name"
            className="bg-gray-100 h-10 text-gray-800 w-full border-2 border-gray-950 rounded-xl text-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold  text-black">Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Product Title"
            className="bg-gray-100   text-gray-800 h-10 w-full border-2 border-gray-950 rounded-xl text-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold  text-black">Price:</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Product Price"
            className="bg-gray-100    text-gray-800 h-10 w-full border-2 border-gray-950 rounded-xl text-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold  text-black">Public Id:</label>
          <input
            value={publicID}
            onChange={(e) => setPublicId(e.target.value)}
            type="text"
            placeholder="Product Public Id"
            className="bg-gray-100   text-gray-800 h-10 w-full border-2 border-gray-950 rounded-xl text-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold  text-black">Category:</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            placeholder="Category"
            className="bg-gray-100   text-gray-800 h-10 w-full border-2 border-gray-950 rounded-xl text-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold  text-black">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
            className="bg-gray-100    text-gray-800 h-20 w-full border-2 border-gray-950 rounded-xl text-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label className="font-bold  text-black">Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="h-10 w-full rounded-xl text-sm p-2  text-gray-900 font-bold"
          />
        </div>

        <button className="bg-green-950 p-2 w-full rounded-xl hover:opacity-85 active:scale-95 font-semibold mt-5 text-white">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateProduct
