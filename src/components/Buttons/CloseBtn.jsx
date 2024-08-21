import React from 'react'
import "./button.css"
import { useNavigate } from 'react-router-dom'

function CloseBtn() {
    const navigate= useNavigate()
  return (
    <div>  <button onClick={() => navigate(-1)} className="close-btn">
    &larr; 
</button></div>
  )
}

export default CloseBtn