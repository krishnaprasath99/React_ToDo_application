import React from 'react'
import { useState } from 'react'



const Content = () => {


    const [count,setCount] = useState(95);
    const [name,setName] =  useState("E");

    function handleNameChange() {
        const names = ["Grow", "Earn"]
        const int = Math.floor(Math.random()*3)
        return names[int]
    
    }

    const handleClick = (e) =>{
        console.log(e)
    }
    const handleClick2 = (name) =>{
        console.log(`thanks for support ${name}`)
    }
    function namess(){
        const names = ["Grow", "Earn", "Give"]
        const int = Math.floor(Math.random()*3)
        return names[int]

    }
    function nameChangeFn() {
        setName(() => {return namess()})
        
    }
    function incrementFunction() {
        setCount((prev_count) => {return prev_count+1})
        setCount((prev_count) => {return prev_count+1})
    }
    function decrementFunction() {
        setCount((prev_count) => {return prev_count-1})
        setCount((prev_count) => {return prev_count-1})
    }
  return (
    <main>
        <p onDoubleClick = {()=>handleClick2('Bala')}>
        Lets {handleNameChange()} Money</p>
        <button onClick={(e) => handleClick(e)}>
            Subscribe1
        </button>

        <button onClick={decrementFunction}>-</button>
        <span>{count}</span>
        <button onClick={incrementFunction}>+</button>

        <p>UseState name {name} change</p>
        <button onClick={() => nameChangeFn()}>
            Subscribe2
        </button>

    </main>
    
  )
}

export default Content