export type Column = {
	name: string;
	compute: string;
	width: number;
	Cell: (props: { value: any }) => JSX.Element;
};
type TableProps = {
	columns: Column[];
	data: any[];
};

export default function Table(props: TableProps) {
	const { columns, data } = props;

	return (
		<div className="p-5 flex flex-col bg-gray-200 w-full h-full shadow-lg justify-center items-stretch rounded-xl">
			<TableHeaderRow columns={columns} />
			{data.map(row => {
				return <TableRow row={row} columns={columns} />;
			})}
		</div>
	);
}

function TableHeaderRow(props: { columns: Column[] }) {
	return (
		<div className="w-full flex flex-row items-stretch justify-center border-gray-400 border-b mb-3">
			{props.columns.map(c => (
				<TableCellContainer column={c}>
					<p className="font-bold text-gray-500">{c.name}</p>
				</TableCellContainer>
			))}
		</div>
	);
}

function TableRow(props: { row: any, columns: Column[] }) {
	const { row, columns } = props;
	return (
		<div className="w-full flex flex-row items-stretch justify-center bg-white my-1 shadow rounded-xl">
			{columns.map(c => (
				<TableCellContainer column={c}>
					<c.Cell value={eval(c.compute)} />
				</TableCellContainer>
			))}
		</div>
	);
}

function TableCellContainer(props: any) {
	const c: Column = props.column;
	return (
		<div style={{ width: `${c.width * 100}%` }} className="p-5 flex justify-center items-center">
			{props.children}
		</div>
	);
}
