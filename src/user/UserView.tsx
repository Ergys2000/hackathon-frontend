import { useEffect } from 'react';
import { Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom';
import { NavBar, NavBarItem } from '../components/NavBar';
import ToolTip from '../components/Tooltip';
import FormsExample from '../examples/FormsExample';
import TableViewExample from './TableViewExample';
import SearchField from '../components/SearchField';
import AlertsExample from './AlertsExample';
import PopupExample from './PopupExample';
import ChartsExample from './ChartsExample';
import ContentContainer from '../components/ContentContainer';

export default function UserView(props: any) {
	const { path, url } = useRouteMatch();

	return (
		<div className="flex h-screen w-screen">
			<NavBar>
				<NavBarItem url={`${url}/buttons`} iconName="home" tooltip="Buttons" />
				<NavBarItem url={`${url}/forms`} iconName="list" tooltip="Forms" />
				<NavBarItem url={`${url}/tooltip`} iconName="brush" tooltip="Tooltip" />
				<NavBarItem url={`${url}/table`} iconName="table_rows" tooltip="Table" />
				<NavBarItem url={`${url}/search`} iconName="search" tooltip="Search Field" />
				<NavBarItem url={`${url}/alerts`} iconName="notifications" tooltip="Alerts" />
				<NavBarItem url={`${url}/popup`} iconName="edit" tooltip="Popup window" />
				<NavBarItem url={`${url}/charts`} iconName="show_chart" tooltip="Charts" />
			</NavBar>
			<ContentContainer>
				<div className="overflow-auto h-full w-full">
					<Switch>
						<Route path={`${path}/buttons`}>
							<button className="action-button p-3 m-3">Button</button>
						</Route>
						<Route path={`${path}/forms`}>
							<FormsExample />
						</Route>
						<Route path={`${path}/tooltip`}>
							<div className="flex items-center space-x-4">
								<h1>Tooltip</h1>
								<ToolTip iconColor="gray-400" popupColor="gray-100" textColor="black" popupText="Lorem Ipsum Dolor Sit Amet"></ToolTip>
							</div>
						</Route>
						<Route path={`${path}/table`}>
							<TableViewExample />
						</Route>
						<Route path={`${path}/search`}>
							<SearchField />
						</Route>
						<Route path={`${path}/alerts`}>
							<AlertsExample />
						</Route>
						<Route path={`${path}/popup`}>
							<PopupExample />
						</Route>
						<Route path={`${path}/charts`}>
							<ChartsExample />
						</Route>
						<Redirect path={`${path}/`} to={`${path}/buttons`} />
					</Switch>
				</div>
			</ContentContainer>
		</div>
	);
}
