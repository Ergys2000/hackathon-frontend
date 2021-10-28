import React from 'react';
import { BrowserRouter as Router, Redirect, Link, Route, Switch } from 'react-router-dom';
import UserView from './user/UserView';
import Login from './Login';

function App() {
	return (
		<div className="flex items-center justify-center w-screen h-screen bg-gray-300 App">
			<Router>
				<Switch>
					<Route path="/login">
						<Login />
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
