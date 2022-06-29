import { BrowserRouter as Router, Redirect, Link, Route, Switch } from 'react-router-dom';
import Demos from './demos/UserView';
import AdminView from './admin/AdminView';
import ReceiverView from './host/HostView';
import Login from './Login';
import DonatorView from './guest/GuestView';
import UserView from './user/UserView';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import GuestView from './guest/GuestView';
import HostView from './host/HostView';

function App() {
	return (
		<div className="flex items-center justify-center w-screen h-screen bg-gray-300 App">
			<Router>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/user/:userId">
						<UserView />
					</Route>
					<Route path="/admin/:userId">
						<AdminView />
					</Route>
					<Route path="/guest/:userId">
						<GuestView />
					</Route>
					<Route path="/host/:userId">
						<HostView />
					</Route>
					<Route path="/demos">
						<Demos />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/forgot">
						<ForgotPassword />
					</Route>
					<Redirect path="/" to="/login" />
				</Switch>
			</Router>

		</div>
	);
}

export default App;
