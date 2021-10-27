import { useEffect, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ContentContainerContext } from '../components/ContentContainer';
import Table from '../components/Table';

type User = {
	name: string;
	surname: string;
	age: number;
	field: string;
};

const data: User[] = [
	{
		name: "Name",
		surname: "Surname",
		age: 18,
		field: "field"
	},
	{
		name: "Name",
		surname: "Surname",
		age: 18,
		field: "field"
	},
	{
		name: "Ergys",
		surname: "Rrjolli",
		age: 21,
		field: "field"
	},
	{
		name: "Name",
		surname: "Surname",
		age: 18,
		field: "field"
	},
	{
		name: "Name",
		surname: "Surname",
		age: 18,
		field: "field"
	},
];

export default function TableViewExample(props: any) {
	const pageContext = useContext(ContentContainerContext);
	const { url } = useRouteMatch();
	useEffect(() => {
		pageContext.setLocationList([{ title: "Tables", url: url }]);
	});
	const cols = [
		{
			name: "Name",
			compute: "row['name']",
			width: .25,
			Cell: (props: { value: any }) => <p className="">{props.value}</p>
		},
		{
			name: "Surname",
			compute: "row['surname']",
			width: .25,
			Cell: (props: { value: any }) => <p className="">{props.value}</p>
		},
		{
			name: "Age",
			compute: "row['age'] + 1",
			width: .25,
			Cell: (props: { value: any }) => <p className="text-green-900">{props.value}</p>
		},
		{
			name: "Full name",
			compute: "row['name'] + ' ' + row['surname']",
			width: .25,
			Cell: (props: { value: any }) => <p className="text-indigo-800">{props.value}</p>
		},
	];
	const columns = [
		{
			name: "Name",
			compute: "row['name']",
			width: .05,
			Cell: (props: { value: any }) => <p className="">{props.value}</p>
		},
		{
			name: "Surname",
			compute: "row['surname']",
			width: .05,
			Cell: (props: { value: any }) => <p className="">{props.value}</p>
		},
		{
			name: "Age",
			compute: "row['age'] + 1",
			width: .05,
			Cell: (props: { value: any }) => <p className="text-green-900">{props.value}</p>
		},
		{
			name: "Full name",
			compute: "row['name'] + ' ' + row['surname']",
			width: .10,
			Cell: (props: { value: any }) => <p className="text-indigo-800">{props.value}</p>
		},
		{
			name: "Another table",
			compute: "row['name'] + ' ' + row['surname']",
			width: .75,
			Cell: (props: { value: any }) => <Table data={data} columns={cols} />
		},
	];
	return (
		<div className="p-10 w-full">
			<Table data={data} columns={columns} />
		</div>
	);
}
