import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Login from './pages/Login';

export const CredentalsContext = React.createContext(null);

function App() {
	const initCredentials = JSON.parse(localStorage.getItem('credentials'));
	const credentialsState = useState(initCredentials);

	return (
		<CredentalsContext.Provider value={credentialsState}>
			<div className='App'>
				<Router>
					<Switch>
						<Route exact path='/'>
							<Welcome />
						</Route>
						<Route exact path='/register'>
							<Register />
						</Route>
						<Route exact path='/login'>
							<Login />
						</Route>
					</Switch>
				</Router>
			</div>
		</CredentalsContext.Provider>
	);
}

export default App;
