import React from 'react';
import { BrowserRouter as Router, Redirect, Link, Route, Switch } from 'react-router-dom';
import UserView from './user/UserView';
import Login from './Login';

function App() {
	return (
		<div className="App w-screen h-screen bg-gray-300 flex justify-center items-center">
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
