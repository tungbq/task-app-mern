import React, { useState } from 'react';

export default function Todos() {
	const [todos, setTodos] = useState([]);
	const [todoText, setTodoText] = useState('');

	const addTodo = (e) => {
		e.preventDefault();
    if (!todoText) return
		setTodos([...todos, { text: todoText }]);
    setTodoText("")
	};

	return (
		<div>
			{todos.map((todo, index) => (
				<div key={index}>
					<input type='checkbox' />
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
