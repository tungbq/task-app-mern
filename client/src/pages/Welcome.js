import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CredentalsContext } from '../App';
import Todos from '../components/Todos';
import Login from './Login';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		marginTop: 0,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	button: {
		margin: theme.spacing(1),
	},
}));

export default function Welcome() {
	const classes = useStyles();
	const [credentials, setCredentials] = useContext(CredentalsContext);

	const logout = () => {
		setCredentials(null);
		localStorage.removeItem('credentials');
	};

	return (
		<div>
			{!credentials && <Login />}

			{credentials && (
				<AppBar position='static' className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge='start'
							className={classes.menuButton}
							color='inherit'
							aria-label='menu'>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							Welcome{' '}
							<strong>
								{credentials ? credentials.username : 'to Task App'}
							</strong>{' '}
							to task app
						</Typography>
						<Button color='inherit' onClick={logout}>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
			)}

			{credentials && <Todos />}
		</div>
	);
}
