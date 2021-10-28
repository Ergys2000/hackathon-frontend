import { useContext, useEffect } from "react";
import { useRouteMatch } from "react-router";
import { ContentContainerContext } from "../components/ContentContainer";
import PaginatedTable from "../components/PaginatedTable";
import { Column } from "../components/Table";

type Row = {
    name: string;
    surname: string;
};
const fetchData = (searchString: string, pageNumber: number, pageSize: number) => {
    const list: Row[] = [];
    for(let i=0; i<pageSize; i++){
        list.push({name: `Page: ${pageNumber} , name ${searchString}, row ${i}`, surname: "Surname " + i});
    }
    return {data: list, result_length: 171};
}
const columns: Column[] = [
    {
        name: "Name",
        width: 0.5,
        compute: "row['name']",
        Cell: (props: {value: any}) => <p>{props.value}</p>
    },
    {
        name: "Surname",
        width: 0.5,
        compute: "row['surname']",
        Cell: (props: {value: any}) => <p>{props.value}</p>
    },
];

export default function PaginatedTableExample(props: any){
    const pageContext = useContext(ContentContainerContext);
    const {url} = useRouteMatch();
    useEffect(() => {
        pageContext.setLocationList([{title: "Paginated table", url: url}, {title: "Table", url: url}]);
    }, []);

    return (
        <PaginatedTable<Row> columns={columns} fetchData={fetchData} />
    );
}
