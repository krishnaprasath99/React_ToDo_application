import React from 'react'
import LineItem from './LineItem'

const ItemsList = ({items, handleCheck, handleDelete}) => {
  return (
    <ul>
        {items.map((i) => (
           <LineItem
           i={i}
           key={i.id}
           handleCheck = {handleCheck}
           handleDelete = {handleDelete}
           />     
        ))}
    </ul>
        
  )
}

export default ItemsList