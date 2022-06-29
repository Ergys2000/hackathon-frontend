import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { ContentContainerContext } from "../components/ContentContainer";

export default function SettingsView(props: any) {
    const {url, path} = useRouteMatch();
    const pageContext = useContext(ContentContainerContext);
    useEffect(() => {
        pageContext.setLocationList([{title: "Settings", url: url}]);
    }, []);
    return (
        <div>Settings</div>
    );
}