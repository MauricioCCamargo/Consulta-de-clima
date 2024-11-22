// import { GetLocals, GetTemperatureAndPrecipitation } from "./weather_service";

const redColor = "#cf2129";
const greenColor = "green";

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("btnSearch").addEventListener("click", function () {
		ShowLocals();
	});
});

async function ShowLocals() {
	try {
		let resultsHtml = `<div class="center-text">
								<span>Selecione um local para visualizar a previsão do tempo:</span>
							</div>
							<div class="four-column-grid">
								<div class="grid-row-border bg-blue">
									<span>Nome</span>
								</div>
								<div class="grid-row-border bg-blue">
									<span>Pais</span>
								</div>
								<div class="grid-row-border bg-blue">
									<span>Latitude</span>
								</div>
								<div class="grid-row-border bg-blue">
									<span>Longitude</span>
								</div>
							</div>`;

		const searchLocal = document.getElementById("inpLocal").value;
		const locals = await GetLocals(searchLocal);

		locals.results.forEach((item) => {
			resultsHtml += `<div id="result-row" class="four-column-grid">
								<div class="grid-row-border">
									<span>${item.name}</span>
								</div>
								<div class="grid-row-border">
									<span>${item.country}</span>
								</div>
								<div class="grid-row-border">
									<span>${item.latitude}</span>
								</div>
								<div class="grid-row-border">
									<span>${item.longitude}</span>
								</div>
							</div>`;
		});

		document.getElementById("results").innerHTML = resultsHtml;

		document.querySelectorAll("#result-row").forEach((item) => {
			item.addEventListener("click", async function (e) {
				const rowData = e.currentTarget.getElementsByTagName("span");
				ShowWeatherForecast(rowData[2].innerText, rowData[3].innerText);
			});
		});
	} catch (e) {
		notify(e.message);
	}
}

async function ShowWeatherForecast(lat, lon) {
	const weatherData = await GetWeatherData(lat, lon);
	weatherData.time.forEach((item, index) => {
		const hourNow = new Date().getHours();
		const itemHour = new Date(item).getHours();
		if (hourNow == itemHour) {
			const divWeather = document.getElementById("weather");

			divWeather.classList.remove("d-none");
			divWeather.innerHTML = `<div>
										<label>Sensação térmica:</label>
										<span>${weatherData.apparent_temperature[index]}°C</span>
									</div>
									<div>
										<label>Temperatura:</label>
										<span>${weatherData.temperature_2m[index]}°C</span>
									</div>
									<div>
										<label>Chance de chuva:</label>
										<span>${weatherData.precipitation_probability[index]}%</span>
									</div>
									<div>
										<label>Visibilidade:</label>
										<span>${weatherData.visibility[index]}m</span>
									</div>
									<div>
										<label>Velocidade do vento:</label>
										<span>${weatherData.wind_speed_10m[index]}km/h</span>
									</div>
									<div>
										<label>Profundidade da neve:</label>
										<span>${weatherData.snow_depth[index]}m</span>
									</div>`;
		}
	});
}

function notify(message, color) {
	Toastify({
		text: message,
		duration: 5000,
		close: true,
		gravity: "top",
		position: "right",
		stopOnFocus: true,
		style: {
			background: color,
		},
	}).showToast();
}
