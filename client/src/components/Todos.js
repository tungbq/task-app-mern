import React, { useContext, useEffect, useState } from 'react';
import { CredentalsContext } from '../App';
import { handleErrors } from '../pages/Login';

export default function Todos() {
	const [todos, setTodos] = useState([]);
	const [todoText, setTodoText] = useState('');
  const [credentials] = useContext(CredentalsContext)

  const persist = () => {
    fetch(`http://localhost:4000/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials.username}:${credentials.password}`
      },
      body: JSON.stringify(todos)
    })
    .then(() => {})
  }

  useEffect(() => {
    persist()
  }, [todos, credentials])


	const addTodo = (e) => {
		e.preventDefault();
    if (!todoText) return
    const newTodo = { checked: false, text: todoText }
    setTodos([...todos, newTodo]);
    setTodoText("")
	};

  const toggleTodo = (index) => {
    const newTodoList = [...todos]
    newTodoList[index].checked = !newTodoList[index].checked
    setTodos(newTodoList)
  }

	return (
		<div>
			{todos.map((todo, index) => (
				<div key={index}>
					<input onChange={() =>toggleTodo(index)} type='checkbox' />
					<label>{todo.text}</label>
				</div>
			))}

			<br />
			<form onSubmit={addTodo}>
				<input value={todoText} onChange={(e) => setTodoText(e.target.value)} type='text' />
				<button type='submit'>Add</button>
			</form>
		</div>
	);
}
