import Swal from 'sweetalert2';
export default function AlertsExample(props: any) {
	const simpleAlert = () => {
		Swal.fire("This alert message");
	}
	const titleAndText = () => {
		Swal.fire("Title", "Message.", "question");
	}
	const iconConfirmAlert = () => {
		Swal.fire({
			icon: "warning",
			text: "Be careful",
			title: "Something",
			footer: "<a href='www.google.com'>Why is this happening</a>",
			showCloseButton: true,
			showCancelButton: true,
			confirmButtonText: "Yes continue..."
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({icon: 'success', text: "You have confirmed", timer: 1000, showConfirmButton: false });
			}
		});
	}
	const toast = () => {
		Swal.fire({
			icon: "warning",
			text: "Some toast",
			timer: 1000,
			showConfirmButton: false,
			position: "top-end"
		});
	}
	return (
		<div className="w-full flex flex-col justify-center items-center">
			<button className="action-button p-2 m-3 w-24" onClick={simpleAlert}>Simple alert</button>
			<button className="action-button p-2 m-3 w-24" onClick={titleAndText}>Title with text, and icon</button>
			<button className="action-button p-2 m-3 w-24" onClick={iconConfirmAlert}>Alert with footer and confirm</button>
			<button className="action-button p-2 m-3 w-24" onClick={toast}>Toat with icon</button>
		</div>
	);
}
