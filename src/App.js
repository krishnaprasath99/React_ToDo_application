import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import './App.css'
import ToDoContent from "./ToDoContent";
import React, { useState, useEffect } from 'react'
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {

  // const [items,setItems] = useState([
  //   {id:1, checked: true, itemName:"item1"},
  //   {id:2, checked: true, itemName:"item2"},
  //   {id:3, checked: true, itemName:"item3"}])


  //Below line is used to get the data from local storage, so that it wont be default when page reloads
  const [items,setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  // If the path is wrong we store and give the error to the user
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const API_URL = "http://localhost:3500/items"


  // useEffect Hook – This gets executed automatically when there is a change in the components in ui
  //here, only when items have any impact on ui, it will load/ during JSON parse from local storage
  // mostly used to load data during api
    useEffect(() => {
      console.log('Rendering')
      //JSON.parse(localStorage.getItem("todo_list"))
      const fetchItems = async () => {
        try{
          const response = await fetch(API_URL)
          if(!response.ok) throw Error("Data not received")
          console.log(response)
          const listItems = await response.json()
          setItems(listItems)
          setFetchError(null)
        }
        catch(err){
          setFetchError(err.message)
        }
        finally{
          
          setIsLoading(false)
        }
      }
      setTimeout(() => {
      (async () => await fetchItems())()
    }, 2000)// artificially create delay

    },[])

    const handleCheck = async (i) => {
        const itemList = items.map((item)=>item.id===i.id? {...item, checked : !item.checked }:item)
        setItems(itemList)

        const myItem = itemList.filter((item) => item.id===i.id)
        const updateOptions = {
          method : 'PATCH',
          headers : {
            'Content-type':'application/json'
          },
          
          body : JSON.stringify({checked:myItem[0].checked})
        }
        console.log("My item", myItem)
        const reqUrl = `${API_URL}/${i.id}`
        console.log("Req-url",reqUrl)
        const result = await apiRequest(reqUrl, updateOptions)
        if(result) setFetchError(result)
    }
    const handleDelete = async (i) => {
        const itemList = items.filter((item) => item.id !== i.id )
        setItems(itemList)

        
        const deleteOptions = {
          method : 'DELETE',         
        }
        const reqUrl = `${API_URL}/${i.id}`
        const result = await apiRequest(reqUrl, deleteOptions)
        if(result) setFetchError(result)
    }
    const addItem = async (i) => {
      console.log(i)
      const id = items.length ? Number(items[items.length-1].id) + 1:0;
      const addNewItem = {id : String(id), checked : false, itemName : i}
      const listItems = [...items,addNewItem]
      setItems(listItems)

      //Below line is used to store the data in local storage, so that it wont be default when page reloads
      localStorage.setItem("todo_list", JSON.stringify(listItems))

      const postOptions = {
        method : 'POST',
        headers : {
          'Content-type':'application/json'
        },
        
        body : JSON.stringify(addNewItem)
      }
      console.log(addNewItem)
      const result = await apiRequest(API_URL, postOptions)
      console.log(result)
      if(result) setFetchError(result)
    }

    const handleAdd = (e) =>{
      e.preventDefault()//prevent page reload in forms
      console.log('Element added')
      if(!newItem) return;
      addItem(newItem)

      setNewItem('')
    }
  
  return (
    <div className="App">
      <Header title = "KP's To-do items"/>
      {/* <Content/> */}
      <AddItem
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleAdd = {handleAdd}
      />
      <SearchItem
        search = {search}
        setSearch = {setSearch}
      />     
      <main>
        {/* If Fetch Error is not null */}
        {fetchError && <p>{`Error : ${fetchError}`}</p>}
        {isLoading && <p>Loading Items...</p>}
      {!isLoading && !fetchError && <ToDoContent
        items = {items.filter(i =>(i.itemName.toLowerCase()).includes(search.toLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
        />}
      </main> 
      <Footer 
        length = {items.length}/>
    </div>
  );
}

export default App;