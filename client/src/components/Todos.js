import React, { useContext, useEffect, useState } from 'react';
import { CredentalsContext } from '../App';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Use list items from material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Delete
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(2),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	textField: {
		width: '30%',
		marginLeft: 'auto',
		marginRight: '5px',
		paddingBottom: 0,
		marginTop: 'auto',
		height: 40,
	},
	button: {
		height: 55,
	},
	button_remove_all: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
		height: 40,
	},
	list: {
		alignItems: 'center',
		justify: 'center',
		marginLeft: '33%',
		marginRight: '33%',
		height: 100,
	},
	margin: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
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
		setFilter('uncompleted');
		setTodoText('');
		persist(newTodos);
	};

	const deleteTodo = (id) => {
		if (window.confirm('Delete the item?')) {
			const newTodoList = todos.filter((todo) => todo._id !== id);
			setTodos(newTodoList);
			persist(newTodoList);
		}
	};

	const deleteAllCompletedTodos = () => {
		if (window.confirm('Delete all the completed item?')) {
			const newTodoList = todos.filter((todo) => todo.checked !== true);
			setTodos(newTodoList);
			persist(newTodoList);
		}
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
			{filter === 'completed' && (
				<Button
					className={classes.button_remove_all}
					type='submit'
					variant='contained'
					color='secondary'
					onClick={() => deleteAllCompletedTodos()}>
					Remove all completed
				</Button>
			)}

			<br />

			<form onSubmit={addTodo} autoComplete='off'>
				<TextField
					className={classes.textField}
					value={todoText}
					onChange={(e) => setTodoText(e.target.value)}
					id='outlined-basic'
					label='Task'
					variant='outlined'
				/>
				<Button
					className={classes.button}
					type='submit'
					variant='contained'
					color='primary'>
					Add
				</Button>
			</form>
			<br />

			<List className={classes.list} justify='center'>
				{getTodos().map((todo) => {
					const labelId = `checkbox-list-label-${todo._id}`;
					return (
						<ListItem
							className={classes.list_item}
							key={todo._id}
							role={undefined}
							dense
							button
							justify='center'>
							<ListItemIcon>
								<Checkbox
									edge='start'
									checked={todo.checked ? 'checked' : ''}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
									onClick={() => toggleTodo(todo._id)}
								/>
							</ListItemIcon>

							<ListItemText
								className={classes.list_item_text}
								id={labelId}
								primary={todo.text}
							/>

							<IconButton
								color='secondary'
								aria-label='delete'
								className={classes.margin}
								onClick={() => deleteTodo(todo._id)}>
								<DeleteIcon />
							</IconButton>
						</ListItem>
					);
				})}
			</List>
		</div>
	);
}
