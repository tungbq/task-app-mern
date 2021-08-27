import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CredentalsContext } from '../App';
import Todos from '../components/Todos'

export default function Welcome() {
	const [credentials] = useContext(CredentalsContext);

	return (
		<div>
			<h1>Welcome {credentials && credentials.username}</h1>
			{!credentials && <Link to='/register'>Register</Link>}
			<br />
			{!credentials && <Link to='/login'>Login</Link>}
			<br />
			{credentials && <Todos />}
		</div>
	);
}
