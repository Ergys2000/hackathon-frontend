import { useContext, useEffect, useRef } from "react";
import { useRouteMatch } from "react-router-dom";
import { ContentContainerContext } from "../components/ContentContainer";

const MainPage = (props: any) => {
    const {url} = useRouteMatch();
    const containerContext = useContext(ContentContainerContext);
    useEffect(() => {
        containerContext.setLocationList([{title: "Main", url: url}])
    }, []);
    return (
        <div>
            <button className="action-button p-5">Press me</button>
        </div>
    );
}
export default MainPage;