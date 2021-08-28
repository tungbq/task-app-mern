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

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
		// width: '90%',
		marginLeft: 'auto',
		marginRight: '5px',
		paddingBottom: 0,
		marginTop: 'auto',
		height: 40,
		// fontWeight: 500,
	},
	button: {
		height: 55	,
	},
}));

const useTextStyles = makeStyles((theme) => ({
	input: {
		height: 40,
	},
	button: {
		height: 40,
	},
	selectRoot: {
		height: 40,
		display: 'table',
		// display: "flex",
		// justifyContent: "center",
		// alignItems: "center",
	},
	select: {
		height: 40,
		paddingTop: 0,
		paddingBottom: 0,
		display: 'table-cell',
		verticalAlign: 'middle',
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

			{/* <Grid container direction='row' spacing='8'>
				<Grid item>
					<TextField
						variant='outlined'
						label='text'
						InputProps={{
							className: classes.input,
						}}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            size="large"
          >
            Save
          </Button>
        </Grid>
			</Grid> */}

			<form onSubmit={addTodo} autoComplete='off'>
				{/* <TextField
					style={}
					value={todoText}
					onChange={(e) => setTodoText(e.target.value)}
					id='standard-basic'
				/> */}
				<>
					<TextField
						className={classes.textField}
						value={todoText}
						onChange={(e) => setTodoText(e.target.value)}
						id='outlined-basic'
						// label='Outlined'
						variant='outlined'
						// height='1000px'
					/>
					<Button
						className={classes.button}
						type='submit'
						variant='contained'
						color='primary'>
						Add
					</Button>
				</>
			</form>

			{/* 
			<form onSubmit={addTodo}>
				<input
					value={todoText}
					onChange={(e) => setTodoText(e.target.value)}
					type='text'
				/>
				<button type='submit'>Add</button>
			</form> */}
			<br />

			{/* <List className={classes_list.root}> */}
			<List>
				{getTodos().map((todo) => {
					const labelId = `checkbox-list-label-${todo._id}`;

					return (
						// <ListItem key={todo._id} role={undefined} dense button>
						<ListItem key={todo._id} role={undefined} dense button>
							<ListItemIcon>
								<Checkbox
									// edge='start'
									checked={todo.checked ? 'checked' : ''}
									// tabIndex={-1}
									// disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
									onClick={() => toggleTodo(todo._id)}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={todo.text} />
						</ListItem>
					);
				})}
			</List>
		</div>
	);
}
