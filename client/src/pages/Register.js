import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

import { CredentalsContext } from '../App';
import React, { useContext, useState } from 'react';
import { handleErrors } from './Login';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Tung Task App
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const classes = useStyles();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [, setCredentials] = useContext(CredentalsContext);

	const updateCredentials = (token) => {
		setCredentials({
			username: username,
			token: token.token,
		});
		localStorage.setItem(
			'credentials',
			JSON.stringify({
				username,
				token: token.token,
			})
		);
	};

	const register = (e) => {
		e.preventDefault();

		if (!username) return setError('Username field is required!');
		if (!password) return setError('Password field is required!');

		if (password !== confirmPassword) {
			return setError("Those passwords didn't match. Please try again!");
		}

		fetch(`http://localhost:4000/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then(handleErrors)
			.then((response) => response.json())
			.then((token) => {
				updateCredentials(token);
				history.push('/');
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	const history = useHistory();

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<h1>
					<strong>Welcome to task app</strong>
				</h1>
				<Avatar className={classes.avatar}>
					<LockOpenRoundedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Register
				</Typography>

				{error && <span style={{ color: 'red' }}>{error}</span>}

				<form className={classes.form} noValidate>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='username'
						label='Username'
						name='username'
						autoComplete='username'
						autoFocus
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						onChange={(e) => setPassword(e.target.value)}
					/>

					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='confirm-password'
						label='Confirm password'
						type='password'
						id='password'
						autoComplete='current-password'
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						onClick={register}>
						Register
					</Button>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
