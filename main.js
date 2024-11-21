const redColor = "#cf2129";
const greenColor = "green";

document.addEventListener("DOMContentLoaded", function () {
	document
		.getElementById("btnSearch")
		.addEventListener("click", async function () {
			try {
				const searchLocal = document.getElementById("inpLocal").value;

				const geoCodeResult = await (
					await fetch(
						`https://geocoding-api.open-meteo.com/v1/search?name=${searchLocal}&language=pt&count=10&format=json`
					)
				).json();

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

				geoCodeResult.results.forEach((item) => {
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
						GetWeatherForecast(rowData[2].innerText, rowData[3].innerText);
					});
				});
			} catch (error) {
				notify(error.message, redColor);
			}
		});
});

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

async function GetWeatherForecast(lat, long) {
	const weatherResult = await (
		await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=precipitation_probability,temperature_2m`
		)
	).json();

	console.log(weatherResult);
}
