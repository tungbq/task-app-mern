import React, { useState } from 'react';

export default function Todos() {
	const [todos, setTodos] = useState([]);
	const [todoText, setTodoText] = useState('');

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
