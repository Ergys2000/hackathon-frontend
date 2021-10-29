import { Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom';
import { NavBar, NavBarItem } from '../components/NavBar';
import ContentContainer from '../components/ContentContainer';
import DonationsView from './DonationsView';
import SettingsView from './SettingsView';
import AnnouncementsView from './AnnouncementsView';

export default function ReceiverView(props: any) {
	const { path, url } = useRouteMatch();

	return (
		<div className="flex w-screen h-screen">
			<NavBar>
				<NavBarItem url={`${url}/donations`} iconName="spa" tooltip="Donations" />
				<NavBarItem url={`${url}/announcements`} iconName="notifications" tooltip="Announcements" />
				<NavBarItem url={`${url}/settings`} iconName="settings" tooltip="Settings" />
			</NavBar>
			<ContentContainer>
				<div className="w-full h-full overflow-auto">
					<Switch>
                        <Route path={`${path}/donations`}>
                            <DonationsView />
                        </Route>
                        <Route path={`${path}/announcements`}>
                            <AnnouncementsView />
                        </Route>
                        <Route path={`${path}/settings`}>
                            <SettingsView />
                        </Route>
						<Redirect path={`${path}/`} to={`${path}/donations`} />
					</Switch>
				</div>
			</ContentContainer>
		</div>
	);
}