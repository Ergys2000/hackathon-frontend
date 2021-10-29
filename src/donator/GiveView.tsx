import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { ContentContainerContext } from "../components/ContentContainer";

export default function GiveView(props: any) {
    const {url, path} = useRouteMatch();
    const pageContext = useContext(ContentContainerContext);
    useEffect(() => {
        pageContext.setLocationList([{title: "Donate", url: url}]);
    }, []);
    return (
        <div>Give view</div>
    );
}