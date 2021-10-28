import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SearchField from './SearchField';
import Select from './Select';
import Table, { Column } from './Table';
import ToolTip from './Tooltip';

type PaginatedTableProps<T> = {
    fetchData: (searchString: string, pageNumber: number, pageSize: number) =>{data: T[], result_length: number};
    columns: Column[];
};

function PaginatedTable<T>(props: PaginatedTableProps<T>) {
    const [settings, setSettings] = useState({
        pageSize: 10,
        pageNumber: 1,
        searchString: "",
        result_length: 0,
    });
    const [data, setData] = useState<T[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const {data, result_length} = props.fetchData(settings.searchString, settings.pageNumber, settings.pageSize);
        /* Fetch the first page when this component first renders */
        setData(data);
        setSettings({...settings, result_length: result_length});
    }, [settings.pageSize, settings.pageNumber, settings.searchString]);

    const onChange = (event: React.ChangeEvent) => {
        const {name, value} = event.target as any;
        if(name === "pageSize") {
            let pageSize = parseInt(value);
            setSettings({...settings, [name]: pageSize});
            return;
        }
        if(name === "search") {
            setSearch(value);
        }
    }
    const onArrowClickForward = () => {
        let pageNumber = settings.pageNumber;
        // TODO: Put constraint to not go over the limit here
        setSettings({...settings, "pageNumber": settings.pageNumber + 1});
    }
    const onArrowClickBack = () => {
        let pageNumber = settings.pageNumber;
        if(pageNumber === 1) {
            Swal.fire({icon: "warning", text: "Sorry you cannot go below page 1."});
            return;
        }
        setSettings({...settings, "pageNumber": settings.pageNumber - 1});
    }
    const onEnterPressed = (event: React.KeyboardEvent) => {
        const {name, value} = event.target as any;
        if(event.key === 'Enter') {
            setSettings({...settings, searchString: value});
        }
    }
    return (
        <div className="flex flex-col bg-gray-200 rounded-xl">
            <div className="flex flex-row items-center h-24 p-5">
                <div className="flex flex-row items-center justify-center">
                    <SearchField value={search} onChange={onChange} name="search" onKeyDown={onEnterPressed} />
                    <div className="mx-3">
                        <ToolTip popupColor={"gray-100"} popupText="Press enter to search" iconColor="gray-400" textColor="gray-700" />
                    </div>
                </div>
                <div className="ml-auto flex flex-row items-center">
                    <Select name="pageSize" onChange={onChange} label="Rows per page" className="w-44" default={10}>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </Select>
                    <p className="text-gray-400 mx-10">{`1-10 of 100`}</p>
                    <div className="mx-5">
                        <i onClick={onArrowClickBack} className="material-icons text-gray-500 mx-5 hover:text-indigo-700 cursor-pointer">arrow_back_ios</i>
                        <i onClick={onArrowClickForward} className="material-icons text-gray-500 hover:text-indigo-700 cursor-pointer">arrow_forward_ios</i>
                    </div>
                </div>
            </div>
            <Table columns={props.columns} data={data} />
        </div>
    );
}

export default PaginatedTable;