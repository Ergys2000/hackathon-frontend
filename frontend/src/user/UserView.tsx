import { useEffect } from "react";
import { Switch, Route, Redirect, useRouteMatch, useHistory, useParams } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import { NavBar, NavBarItem } from "../components/NavBar";
import MainPage from "./MainPage";

const UserView = () => {
	const {userId} = useParams() as any;
    const {url, path} = useRouteMatch();
	const history = useHistory();
    useEffect(() => {
		if(!sessionStorage.getItem("jwt")) {
			history.push("/");
		}
	}, []);
    return (
		<div className="flex w-screen h-screen">
			<NavBar>
				<NavBarItem url={`${url}/main`} iconName="how_to_reg" tooltip="Main" />
				<NavBarItem url={`/login`} iconName="logout" tooltip="Logout" />
			</NavBar>
			<ContentContainer>
				<div className="w-full h-full overflow-auto">
					<Switch>
                        <Route path={`${path}/main/`}>
							<MainPage />
						</Route>
						<Redirect path={`${path}/`} to={`${path}/main`} />
					</Switch>
				</div>
			</ContentContainer>
		</div>
    );
}



export default UserView;