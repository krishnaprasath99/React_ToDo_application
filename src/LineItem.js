import React from 'react'

const LineItem = ({i, handleCheck, handleDelete}) => {
  return (
    <li className='item' key={i.id}>
                <input 
                    type='checkbox'
                    onChange={() => handleCheck(i)}
                    checked={i.checked}
                />
                <label onDoubleClick={() => handleCheck(i)}>{i.itemName}</label>
                <button onClick={() => handleDelete(i)}>Delete</button>
            </li>
  )
}

export default LineItem