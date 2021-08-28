import React, { useContext, useEffect, useState } from 'react';
import { CredentalsContext } from '../App';
import { v4 as uuidv4 } from 'uuid';

// using material UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// use list items from material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const useListStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		width: '100%',
		maxWidth: 360,
		textAlign: 'center',
		minWidth: 120,
		// backgroundColor: theme.palette.background.paper,
	},
}));

export default function Todos() {
	const classes_list = useListStyles();

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

			<br />

			<List className={classes_list.root}>
				{getTodos().map((todo) => {
					const labelId = `checkbox-list-label-${todo._id}`;

					return (
						<ListItem key={todo._id} role={undefined} dense button>
							<ListItemIcon >
								<Checkbox
									edge='start'
									checked={todo.checked ? 'checked' : ''}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
									onClick={() => toggleTodo(todo._id)}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={todo.text} />
						</ListItem>
					);
				})}
			</List>

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
