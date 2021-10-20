import React from 'react';
import { BrowserRouter as Router, Redirect, Link, Route, Switch } from 'react-router-dom';
import UserView from './user/UserView';

function App() {
	return (
		<div className="App w-screen h-screen bg-gray-300">
			<Router>
				<Switch>
					<Route path="/login">
						<h1>Login page</h1>
					</Route>
					<Route path="/user">
						<UserView />
					</Route>
					<Redirect path="/" to="/login" />
				</Switch>
			</Router>

		</div>
	);
}

export default App;
