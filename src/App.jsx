/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  //state variables

  return (
      <div style={{fontSize : "20px"}}>
        <h1>Easy Todo App</h1>
          <ListTodos />
      </div>
    
  )
}


function ListTodos() {
  const [todos, setTodos] = useState([]);
  //for passing the title and description to the backend
  const [title , setTitle] = useState("");
  const [description , setDesc] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/todos", {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);
  
  //function to send request to create a Todo
  function addTodo(id) {
    fetch("http://localhost:3000/todos" ,{
      method : "POST",
      body : JSON.stringify({
        title : title,
        description : description
      }),
      headers : {
        "Content-type": "application/json"
      }
    }).then((res)=>{
      res.json().then((newTodo)=>{
        setTodos(prevTodos => [...prevTodos, newTodo]);
      })
    })
  }
  
//function to send request to the backend to delete a todo
  function deleteTodo(id) {
    fetch("http://localhost:3000/todos/" + id, {
      method: "DELETE"
    }).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  }

  return (
    <div>
      <input style={{
          display : "flex",
          flexDirection : "column",
          marginBottom : "15px",
          fontSize : "20px"}} 
          type="text" placeholder='title' 
          //using onchange to change the title as the user changes it
          onChange={(e)=>{
            setTitle(e.target.value);
          }} />
        
        <input style={{fontSize : "20px"}}
        type="text" placeholder='message' 
        // using onchang to change the message as the user changes it 
        onChange={(e)=>{
          setDesc(e.target.value);
        }} />
        <br />
        <button  style={{fontSize : 14 , marginTop : 15}} 
        //calling the addTodo function to create a todo
        onClick={()=> addTodo()}
        >Send</button>
      <h3>Your Todos List</h3>
      <ul>
        {todos.map((todo, index) => (
          <div key={todo.id} style={{ marginTop: "10px" }}>
            <li>
              Id: {todo.id}
              <br />
              Title: {todo.title}
              <br />
              Message: {todo.description}
              <button
                style={{
                  marginLeft: "9px",
                  fontSize: "15px"
                }}
                //calling to delete the todo function
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}


export default App
