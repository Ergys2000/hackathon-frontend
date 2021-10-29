import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { ContentContainerContext } from "../components/ContentContainer";

export default function RenovationsView(props: any) {
    const {url, path} = useRouteMatch();
    const pageContext = useContext(ContentContainerContext);
    useEffect(() => {
        pageContext.setLocationList([{title: "Renovation Requests", url: url}]);
    }, []);
    return (
        <div>
            Renovations
        </div>
    );
}