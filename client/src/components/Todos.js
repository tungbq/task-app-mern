import React, { useContext, useEffect, useState } from 'react';
import { CredentalsContext } from '../App';
import { handleErrors } from '../pages/Login';
import { v4 as uuidv4 } from 'uuid';

// using material UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export default function Todos() {
	const classes = useStyles();
	const [todos, setTodos] = useState([]);
	const [todoText, setTodoText] = useState('');
	const [credentials] = useContext(CredentalsContext);
	const [filter, setFilter] = useState('uncompleted');

	const persist = (newTodos) => {
		fetch(`http://localhost:4000/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${credentials.username}:${credentials.password}`,
			},
			body: JSON.stringify(newTodos),
		}).then(() => {});
	};

	const getTodos = () => {
		return todos.filter((todo) =>
			filter === 'completed' ? todo.checked : !todo.checked
		);
	};

	useEffect(() => {
		fetch(`http://localhost:4000/todos`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${credentials.username}:${credentials.password}`,
			},
		})
			.then((response) => response.json())
			.then((todos) => setTodos(todos));
	}, []);

	const addTodo = (e) => {
		e.preventDefault();
		if (!todoText) return;
		const newTodo = { _id: uuidv4(), checked: false, text: todoText };
		const newTodos = [...todos, newTodo];
		setTodos(newTodos);
		setTodoText('');
		persist(newTodos);
	};

	const toggleTodo = (id) => {
		const newTodoList = [...todos];
		const todoItem = newTodoList.find((todo) => todo._id === id);
		todoItem.checked = !todoItem.checked;

		setTodos(newTodoList);
		persist(newTodoList);
	};

	const changeFilter = (newFilter) => {
		setFilter(newFilter);
	};

	return (
		<div>
			{/* <select onChange={(e) => changeFilter(e.target.value)}>
        <option value="uncompleted">UnCompleted</option>
        <option value="completed">Completed</option>
      </select> */}

			<FormControl className={classes.formControl}>
				<InputLabel id='demo-simple-select-label'>Status</InputLabel>
				<Select
					value={filter}
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					onChange={(e) => changeFilter(e.target.value)}>
					<MenuItem value='uncompleted'>Uncompleted</MenuItem>
					<MenuItem value='completed'>Completed</MenuItem>
				</Select>
			</FormControl>

			{getTodos().map((todo) => (
				<div key={todo._id}>
					<input
						checked={todo.checked ? 'checked' : ''}
						onChange={() => toggleTodo(todo._id)}
						type='checkbox'
					/>
					<label>{todo.text}</label>
				</div>
			))}

			<br />
			<form onSubmit={addTodo}>
				<input
					value={todoText}
					onChange={(e) => setTodoText(e.target.value)}
					type='text'
				/>
				<button type='submit'>Add</button>
			</form>
		</div>
	);
}
