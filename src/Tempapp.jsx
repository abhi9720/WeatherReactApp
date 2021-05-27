import React, { useState, useEffect } from 'react';
import Clock from 'react-digital-clock';
const Tempapp = () => {
	const [City, setCity] = useState(null);
	const [search, setSearch] = useState('mumbai');
	const inputRef = React.useRef('mumbai');
	const timeoutId = React.useRef();

	const fetchData = async (search) => {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=dab8
66aff`;
		const response = await fetch(url);
		const data = await response.json();
		// console.log(data);
		await setCity(data);
	};

	useEffect(() => {
		// if the user keeps typing, stop the API call!
		clearTimeout(timeoutId.current);
		if (!search.trim()) return;

		timeoutId.current = setTimeout(() => {
			// get lastest last stored value
			try {
				fetchData(search);
			} catch {
				alert('failed to fetch data');
			}
		}, 800);
	}, [search]);

	return (
		<>
			<div className="frame">
				<div className="time-zone">
					<span className="date">{new Date().toLocaleDateString()}</span>
					<span className="time">
						<Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Pacific'} />
					</span>
				</div>

				<div className="front1">
					<input
						type="search"
						className="inputField"
						defaultValue="mumbai"
						onChange={(e) => {
							setSearch(e.target.value);
							// mimic the value so we can access
							// the latest value in our API call
							inputRef.current = e.target.value;
						}}
					/>

					<p className="city" style={{ zIndex: '10000' }}>
						<i className="fas fa-street-view" />
						{City && City.main ? City.name : ' '}
					</p>
				</div>
				<div className="front2">
					{City && City.main ? (
						<>
							<div className="info">
								<div className="temperature">
									{`${Math.round(City.main.temp - 273)}°`}
									<span>cel</span>
								</div>

								<div className="icons">
									<i className="fas fa-wind" /> {`${City.wind.speed.toFixed(1)}`} km/h <br />
									<i className="fas fa-tint"></i> {`${City.main.humidity}`}
								</div>

								<div className="">
									<table className="preview">
										<tbody>
											<tr>
												<td>Min </td>
												<td>{`${Math.round(City.main.temp_min - 273)}°`}</td>
											</tr>
											<td>Max</td>
											<td>{`${Math.round(City.main.temp_max - 273)}°`}</td>
										</tbody>
									</table>
								</div>
							</div>

							<div className="description">
								<span> {`${City.weather[0].description}`}</span>
								<br />
								<h1 className="repo_link">
									<a href="https://github.com/abhi9720/WeatherReactApp">
										<img
											src="https://img.icons8.com/material-sharp/24/000000/github.png"
											alt="failed to github"
										/>
									</a>
									<a href="https://www.linkedin.com/in/abhishek-tiwari-b86a1a19a/">
										<img
											src="https://img.icons8.com/material-sharp/24/000000/linkedin--v2.png"
											alt="failed to load linkedin"
										/>
									</a>
								</h1>
							</div>
						</>
					) : (
						<span>No Information Found </span>
					)}
				</div>
			</div>
		</>
	);
};

export default Tempapp;
