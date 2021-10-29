import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { ContentContainerContext } from "../components/ContentContainer";

export default function RegistrationsView() {
    const {url, path} = useRouteMatch();
    const pageContext = useContext(ContentContainerContext);
    useEffect(() => {
        pageContext.setLocationList([{title: "Registration Requests", url: url}]);
    }, []);
    return (
        <div>Registrations</div>
    );
}