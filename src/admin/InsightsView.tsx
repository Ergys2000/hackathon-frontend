import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router";
import { ContentContainerContext } from "../components/ContentContainer";

export default function Insights(props: any) {
    const {url, path} = useRouteMatch();
    const pageContext = useContext(ContentContainerContext);
    useEffect(() => {
        pageContext.setLocationList([{title: "Insights", url: url}]);
    }, []);
    return (
        <div>Insights</div>
    );
}