import { Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom';
import { NavBar, NavBarItem } from '../components/NavBar';
import ContentContainer from '../components/ContentContainer';
import GiveView from './GiveView';
import RatingsView from './RatingsView';
import SettingsView from './SettingsView';

export default function DonatorView(props: any) {
	const { path, url } = useRouteMatch();

	return (
		<div className="flex w-screen h-screen">
			<NavBar>
				<NavBarItem url={`${url}/give`} iconName="how_to_reg" tooltip="Donate" />
				<NavBarItem url={`${url}/myratings`} iconName="restore" tooltip="My ratings" />
				<NavBarItem url={`${url}/settings`} iconName="settings" tooltip="Settings" />
			</NavBar>
			<ContentContainer>
				<div className="w-full h-full overflow-auto">
					<Switch>
                        <Route path={`${path}/give`}>
                            <GiveView />
                        </Route>
                        <Route path={`${path}/myratings`}>
                            <RatingsView />
                        </Route>
                        <Route path={`${path}/settings`}>
                            <SettingsView />
                        </Route>
						<Redirect path={`${path}/`} to={`${path}/give`} />
					</Switch>
				</div>
			</ContentContainer>
		</div>
	);
}
