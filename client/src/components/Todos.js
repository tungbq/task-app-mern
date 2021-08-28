import React, { useContext, useEffect, useState } from 'react';
import { CredentalsContext } from '../App';
import { handleErrors } from '../pages/Login';

export default function Todos() {
	const [todos, setTodos] = useState([]);
	const [todoText, setTodoText] = useState('');
  const [credentials] = useContext(CredentalsContext)
  const [filter, setFilter] = useState('uncompleted')

  const persist = (newTodos) => {
    fetch(`http://localhost:4000/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials.username}:${credentials.password}`
      },
      body: JSON.stringify(newTodos)
    })
    .then(() => {})
  }

  const getTodos = () => {
    return todos
  }

  useEffect(() => {
    fetch(`http://localhost:4000/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials.username}:${credentials.password}`
      }
    })
    .then((response) => response.json())
    .then((todos) => setTodos(todos))
  }, [])


	const addTodo = (e) => {
		e.preventDefault();
    if (!todoText) return
    const newTodo = { checked: false, text: todoText }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos);
    setTodoText("")
    persist(newTodos)
	};

  const toggleTodo = (index) => {
    const newTodoList = [...todos]
    newTodoList[index].checked = !newTodoList[index].checked
    setTodos(newTodoList)
    persist(newTodoList)
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

	return (
		<div>
      <select onChange={(e) => changeFilter(e.target.value)}>
        <option value="completed">Completed</option>
        <option value="uncompleted">UnCompleted</option>
      </select>

			{getTodos().map((todo, index) => (
				<div key={index}>
					<input checked={todo.checked ? 'checked' : ''} onChange={() => toggleTodo(index)} type='checkbox' />
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
