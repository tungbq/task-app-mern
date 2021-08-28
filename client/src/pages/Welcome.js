import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CredentalsContext } from '../App';
import Todos from '../components/Todos'
import Login from './Login';

export default function Welcome() {
	const [credentials, setCredentials] = useContext(CredentalsContext);

	const logout = () => {
		setCredentials(null)
	}

	return (
		<div>
			<h1>Welcome {credentials ? credentials.username : "to Task App"}</h1>
			{/* {!credentials && <Link to='/register'>Register</Link>}
			<br />
			{!credentials && <Link to='/login'>Login</Link>} */}
			{!credentials && <Login />}
			<br />
			{credentials && <Todos />}

			{credentials && <button onClick={logout}>Logout</button>}
		</div>
	);
}
