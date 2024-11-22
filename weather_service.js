async function GetWeatherData(lat, lon) {
	const weatherResult = await (
		await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation_probability,snow_depth,visibility,wind_speed_10m&timezone=America%2FSao_Paulo&forecast_days=1`
		)
	).json();

	return weatherResult.hourly;
}

async function GetLocals(localName) {
	const geoCodeResult = await (
		await fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${localName}&language=pt&count=10&format=json`
		)
	).json();

	return geoCodeResult;
}
