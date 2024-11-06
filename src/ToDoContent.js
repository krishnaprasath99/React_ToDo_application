import React, { useState } from 'react'
import {FaTrashAlt} from "react-icons/fa"
import ItemsList from './ItemsList'

const ToDoContent = ({items, handleCheck, handleDelete}) => {
    
    return (
    <>
        {(items.length===0)?<p>Empty!!</p>:<p></p>}
        <ItemsList
            items = {items}
            handleCheck = {handleCheck}
            handleDelete = {handleDelete}
        />
        
    </>
  )
}

export default ToDoContent