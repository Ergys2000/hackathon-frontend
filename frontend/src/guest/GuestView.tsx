import { Switch, Route, Link, useRouteMatch, Redirect, useHistory, useParams } from 'react-router-dom';
import { NavBar, NavBarItem } from '../components/NavBar';
import ContentContainer from '../components/ContentContainer';
import { useEffect } from 'react';
import AccountSettings from './AccountSettings';
import MakeReservationView from './MakeReservationView';
import MyReservations from './MyReservations';
import ChangePassword from './ChangePassword';
import PaymentComponent from './PaymentComponent';
import MapsView from './MapsView';
import ReserveCampsite from './ReserveCampsite';

export default function GuestView(props: any) {
	const {userId} = useParams() as any;
    const {url, path} = useRouteMatch();
	const history = useHistory();
    useEffect(() => {
		if(!sessionStorage.getItem("jwt")) {
			history.push("/");
		}
		if(sessionStorage.getItem("role") !== "guest") {
			history.push("/");
		}
	}, []);

	return (
		<div className="flex w-screen h-screen">
			<NavBar>
				<NavBarItem url={`${url}/myreservations`} iconName="import_contacts" tooltip="My reservations" />
				<NavBarItem url={`${url}/makereservation`} iconName="bookmarks" tooltip="Make reservation" />
				<NavBarItem url={`${url}/account`} iconName="settings" tooltip="Settings" />
				<NavBarItem url={`/login`} iconName="logout" tooltip="Log out" />
			</NavBar>
			<ContentContainer>
				<div className="w-full h-full overflow-auto">
					<Switch>
                        <Route path={`${path}/account`}>
                            <AccountSettings type="guest" />
                        </Route>
                        <Route path={`${path}/makereservation`}>
                            <MakeReservationView />
                        </Route>
                        <Route path={`${path}/myreservations`}>
                            <MyReservations />
                        </Route>
						<Route path={`${path}/changepassword`}>
                            <ChangePassword />
                        </Route>
						<Redirect path={`${path}/`} to={`${path}/myreservations`} />
					</Switch>
				</div>
			</ContentContainer>
		</div>
	);
}
