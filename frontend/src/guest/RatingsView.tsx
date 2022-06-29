import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { ContentContainerContext } from "../components/ContentContainer";

export default function RatingsView(props: any) {
    const {url, path} = useRouteMatch();
    const pageContext = useContext(ContentContainerContext);
    useEffect(() => {
        pageContext.setLocationList([{title: "My Ratings", url: url}]);
    }, []);
    return (
        <div>Ratings view</div>
    );
}