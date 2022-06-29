import { useContext, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { HostCancellationToken } from "typescript";
import { ContentContainerContext } from "../components/ContentContainer";
import PaginatedTable, { PageData } from "../components/PaginatedTable";
import { API_LINK } from "../util/authenticate";
import {User, Campsite} from "../util/types";

export default function CampsitesList(props: any) {
    const {userId} = useParams() as any;
    const {url, path} = useRouteMatch();
    const pageContext = useContext(ContentContainerContext);
    useEffect(() => {
        pageContext.setLocationList([{title: "Campsites", url: url}]);
    }, []);
    const fetchCampsites = async () => {
        return await fetch(`${API_LINK}/campsite`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(res => {
            console.log(res);
            return {data: res.result, result_length: 0};
        })
    }
    const columns = [
        {
            name: "Name",
            width: 0.25,
            compute: "row['name']",
            Cell: (props: {value: any}) => <div>{props.value}</div>
        },
        {
            name: "Description",
            width: 0.25,
            compute: "row['description']",
            Cell: (props: {value: any}) => <div>{props.value}</div>
        },
        {
            name: "Maps",
            width: 0.25,
            compute: "''",
            Cell: (props: {value: any}) => <button className="action-button p-5"><i className="material-icons">pin_drop</i></button>
        }
    ];
    return (
        <div>
            <PaginatedTable<any> fetchData={fetchCampsites} columns={columns}  />
        </div>
    );
}