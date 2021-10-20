import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { NavBar, NavBarItem } from '../components/NavBar';
import ToolTip from '../components/Tooltip';
import Input from '../components/Input';
export default function UserView(props: any) {
	const { path, url } = useRouteMatch();
	return (
		<div className="flex h-screen w-screen">
			<NavBar>
				<NavBarItem url={`${url}/buttons`} iconName="home" tooltip="Buttons" />
				<NavBarItem url={`${url}/forms`} iconName="list" tooltip="Forms" />
				<NavBarItem url={`${url}/tooltip`} iconName="brush" tooltip="Tooltip" />
			</NavBar>
			<div className="overflow-auto h-full w-full">
				<Switch>
					<Route path={`${path}/buttons`}>
						<div></div>
						<button className="action-button p-3 m-3">Button</button>
					</Route>
					<Route path={`${path}/forms`}>
						<h1>Form inputs</h1>
						<form className="w-1/2 border p-5">
							<Input />
							<select className="select my-5">
								<option>option 1</option>
								<option>option 2</option>
								<option>option 3</option>
							</select>
							<textarea className="textarea"></textarea>
						</form>
					</Route>
					<Route path={`${path}/tooltip`}>
						<div className="flex items-center space-x-4">
							<h1>Tooltip</h1>
							<ToolTip iconColor="gray-400" popupColor="white" textColor="black" popupText="Lorem Ipsum Dolor Sit Amet"></ToolTip>
						</div>
					</Route>
				</Switch>
			</div>
		</div>
	);
}
