import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CredentalsContext } from '../App';

export default function Welcome() {
	const [credentials] = useContext(CredentalsContext);

	return (
		<div>
			<h1>Welcome {credentials && credentials.username}</h1>
			{!credentials && <Link to='/register'>Register</Link>}
		</div>
	);
}
