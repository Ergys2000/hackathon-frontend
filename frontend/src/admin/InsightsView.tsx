import { Chart } from "chart.js";
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
        <div>
            <ReservationsOnDate />
        </div>
    );
}

const ReservationsOnDate = (props: any) => {
	const pageContext = useContext(ContentContainerContext);
	const { url } = useRouteMatch();
	useEffect(() => {
		pageContext.setLocationList([{ title: "Charts", url: url }]);
	}, []);
	useEffect(() => {
		const ctx = document.getElementById('myChart') as any;
		const myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Jan', 'Feb', 'March', 'May', 'June', 'July', "Aug", "Sep", "Oct", "Nov", "Dec"],
				datasets: [{
					label: 'Reservervations over Months 2021',
					data: [120, 190, 30, 50, 20, 30, 35, 90, 12, 45, 34,9],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
		const myLineChartCtx = document.getElementById("myLineChart") as any;
		const myLineChart = new Chart(myLineChartCtx, {
			type: 'line',
			data: {
				labels: ['Jan', 'Feb', 'March', 'May', 'June', 'July', "Aug", "Sep", "Oct", "Nov", "Dec"],
				datasets: [{
					label: 'Reservervations over Months 2021',
					data: [120, 190, 30, 50, 20, 30, 35, 90, 12, 45, 34,9],
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					tension: 0.1
				}]
			}
		});
	}, []);
	return (
		<div>
			<canvas id="myChart"></canvas>
			<canvas id="myLineChart"></canvas>
		</div>
	);
}