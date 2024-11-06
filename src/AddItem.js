import React from 'react'
import { useRef } from 'react'

const AddItem = ({newItem, setNewItem, handleAdd}) => {
  
    // Useref hook – to bring the focus to the desired place
    const inputRef = useRef()
    return (
    <form className=''addForm onSubmit={handleAdd}>
        {/* <label htmlfor="addItem">Add Item</label> */}
        <input
            autoFocus
            ref = {inputRef}
            id = 'addItem'
            type = 'text'
            placeholder='Add Item'
            required
            value = {newItem}  
            onChange={(e) => setNewItem(e.target.value)}
        />
        <button
            type = 'submit'
            aria-label = 'Add Item'
            onClick={() => inputRef.current.focus()}
        >
            Add
        </button>
    </form>
  )
}

export default AddItem