import { Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom';
import { NavBar, NavBarItem } from '../components/NavBar';
import ContentContainer from '../components/ContentContainer';
import RegistrationsView from './RegistrationsView';
import RenovationsView from './RenovationsView';
import InsightsView from './InsightsView';
import SettingsView from './SettingsView';

export default function UserView(props: any) {
	const { path, url } = useRouteMatch();

	return (
		<div className="flex w-screen h-screen">
			<NavBar>
				<NavBarItem url={`${url}/registrations`} iconName="how_to_reg" tooltip="Registration requests" />
				<NavBarItem url={`${url}/renovations`} iconName="restore" tooltip="Renovation Requests" />
				<NavBarItem url={`${url}/insights`} iconName="insights" tooltip="Insights" />
				<NavBarItem url={`${url}/settings`} iconName="settings" tooltip="Settings" />
			</NavBar>
			<ContentContainer>
				<div className="w-full h-full overflow-auto">
					<Switch>
                        <Route path={`${path}/registrations`}>
                            <RegistrationsView />
                        </Route>
                        <Route path={`${path}/renovations`}>
                            <RenovationsView />
                        </Route>
                        <Route path={`${path}/insights`}>
                            <InsightsView />
                        </Route>
                        <Route path={`${path}/settings`}>
                            <SettingsView />
                        </Route>
						<Redirect path={`${path}/`} to={`${path}/registrations`} />
					</Switch>
				</div>
			</ContentContainer>
		</div>
	);
}
