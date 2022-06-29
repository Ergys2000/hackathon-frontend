import { Switch, Route, Link, useRouteMatch, Redirect, useHistory, useParams } from 'react-router-dom';
import { NavBar, NavBarItem } from '../components/NavBar';
import ContentContainer from '../components/ContentContainer';
import RegistrationsView from './RegistrationsView';
import UsersView from './UsersView';
import RenovationsView from './RenovationsView';
import InsightsView from './InsightsView';
import SettingsView from './SettingsView';
import { useEffect } from 'react';
import AccountSettings from '../guest/AccountSettings';
import CampsitesList from '../host/CampsitesList';
import ChangePassword from '../guest/ChangePassword';

export default function AdminView(props: any) {
	const {userId} = useParams() as any;
    const {url, path} = useRouteMatch();
	const history = useHistory();
    useEffect(() => {
		if(!sessionStorage.getItem("jwt")) {
			history.push("/");
		}
		if(sessionStorage.getItem("role") !== "admin") {
			history.push("/");
		}
	}, []);
	return (
		<div className="flex w-screen h-screen">
			<NavBar>
				<NavBarItem url={`${url}/insights`} iconName="insights" tooltip="Insights" />
				<NavBarItem url={`${url}/users`} iconName="person" tooltip="Users" />
				<NavBarItem url={`${url}/campsites`} iconName="cabin" tooltip="Campsites" />
				<NavBarItem url={`${url}/account`} iconName="settings" tooltip="Settings" />
				<NavBarItem url={`/login`} iconName="logout" tooltip="Logout" />
			</NavBar>
			<ContentContainer>
				<div className="w-full h-full overflow-auto">
					<Switch>
						<Route path={`${path}/users`}>
                            <UsersView />
                        </Route>
						<Route path={`${path}/insights`}>
                            <InsightsView />
                        </Route>
						<Route path={`${path}/campsites`}>
							<CampsitesList isAdmin={true} />
                        </Route>
						<Route path={`${path}/changepassword`}>
                            <ChangePassword />
                        </Route>
                        <Route path={`${path}/account`}>
							<AccountSettings type="users" />
                        </Route>
						<Redirect path={`${path}/`} to={`${path}/users`} />
					</Switch>
				</div>
			</ContentContainer>
		</div>
	);
}
