import { BrowserRouter as Router, Redirect, Link, Route, Switch } from 'react-router-dom';
import UserView from './demos/UserView';
import AdminView from './admin/AdminView';
import ReceiverView from './receiver/ReceiverView';
import Login from './Login';
import DonatorView from './donator/DonatorView';
import RegisterView from './register/RegisterView';

function App() {
	return (
		<div className="flex items-center justify-center w-screen h-screen bg-gray-300 App">
			<Router>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/admin">
						<AdminView />
					</Route>
					<Route path="/receiver">
						<ReceiverView />
					</Route>
					<Route path="/donator">
						<DonatorView />				
					</Route>
					<Route path="/register">
						<RegisterView />
					</Route>
					<Route path="/demos">
						<UserView />
					</Route>
					<Redirect path="/" to="/login" />
				</Switch>
			</Router>

		</div>
	);
}

export default App;
