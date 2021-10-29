import { useEffect, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ContentContainerContext } from '../components/ContentContainer';
import Chart from 'chart.js/auto';
 
const ChartsExample = (props: any) => {
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
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [{
					label: '# of Votes',
					data: [12, 19, 3, 5, 2, 3],
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
				labels: ["January", 'February', 'March', 'April', 'May'],
				datasets: [{
					label: "First dataset",
					data: [65, 59, 80, 81, 56, 55, 40],
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

export default ChartsExample;
