import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

export const CredentalsContext = React.createContext(null);

function App() {
  const credentialsState = useState(null)

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
					</Switch>
				</Router>
			</div>
		</CredentalsContext.Provider>
	);
}

export default App;
