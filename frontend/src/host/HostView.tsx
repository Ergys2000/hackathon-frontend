import { Switch, Route, Link, useRouteMatch, Redirect, useHistory, useParams } from 'react-router-dom';
import { NavBar, NavBarItem } from '../components/NavBar';
import ContentContainer from '../components/ContentContainer';
import SettingsView from './SettingsView';
import AnnouncementsView from './CampsitesList';
import { useEffect } from 'react';
import CampsitesList from './CampsitesList';
import AccountSettings from '../guest/AccountSettings';
import ChangePassword from '../guest/ChangePassword';
import InsightsView from '../admin/InsightsView';

export default function HostView(props: any) {
	const {userId} = useParams() as any;
    const {url, path} = useRouteMatch();
	const history = useHistory();
    useEffect(() => {
	}, []);

	return (
		<div className="flex w-screen h-screen">
			<NavBar>
				<NavBarItem url={`${url}/insights`} iconName="insights" tooltip="Insights" />
				<NavBarItem url={`${url}/campsites`} iconName="cabin" tooltip="Campsites" />
				<NavBarItem url={`${url}/account`} iconName="settings" tooltip="Settings" />
				<NavBarItem url={`/login`} iconName="logout" tooltip="Logout" />
			</NavBar>
			<ContentContainer>
				<div className="w-full h-full overflow-auto">
					<Switch>
                        <Route path={`${path}/campsites`}>
                            <CampsitesList />
                        </Route>
						<Route path={`${path}/insights`}>
                            <InsightsView />
                        </Route>
                        <Route path={`${path}/account`}>
							<AccountSettings type="host" />
                        </Route>
						<Route path={`${path}/changepassword`}>
                            <ChangePassword />
                        </Route>
						<Redirect path={`${path}/`} to={`${path}/campsites`} />
					</Switch>
				</div>
			</ContentContainer>
		</div>
	);
}