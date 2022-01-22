import React, { useState } from 'react';
import useOpenMeteo from '../hooks/useOpenMeteo';
import ForecastItem from './ForecastItem';
import TemperatureDisplay from './TemperatureDisplay';
import WeatherCode from './WeatherCode';

const timezone = 'Europe/London';
const dailyVars = ['weathercode', 'temperature_2m_max', 'temperature_2m_min'];
const hourlyVars = ['temperature_2m', 'weathercode'];

const WeatherWidget = (props) => {
	const { cityName, latitude, longitude } = props;
	const { refresh, lastUpdate, data } = useOpenMeteo({
		timezone,
		dailyVars,
		hourlyVars,
		latitude,
		longitude,
		interval: 60000,
	});
	const [currentTab, setCurrentTab] = useState('day');

	return (
		<div className='weather-container-content'>
			<header className='weather-container-header'>
				<p className='location'>{cityName}</p>
				<button className='refresh-button' onClick={refresh}>
					<img
						src='https://lpmiaw-react.napkid.dev/img/weather/refresh.png'
						alt='Refresh'
					/>
				</button>
			</header>
			<p className='date'>{new Date().toLocaleDateString()}</p>
			{data ? (
				<article className='today'>
					<WeatherCode code={data.daily.weathercode[0]} />
					<TemperatureDisplay
						avg={Math.round(
							(data.daily.temperature_2m_min[0] +
								data.daily.temperature_2m_max[0]) /
								2
						)}
						min={Math.round(data.daily.temperature_2m_min[0])}
						max={Math.round(data.daily.temperature_2m_max[0])}
					/>
				</article>
			) : (
				<p>Pas de données</p>
			)}
			{data && (
				<section>
					<nav className='tabs'>
						<button
							onClick={() => setCurrentTab('day')}
							className={currentTab === 'day' ? 'tab tab--active' : 'tab'}
						>
							Journée
						</button>
						<button
							onClick={() => setCurrentTab('week')}
							className={currentTab === 'week' ? 'tab tab--active' : 'tab'}
						>
							Semaine
						</button>
					</nav>
					<ul className='forecast'>
						{currentTab === 'week' &&
							Array(5)
								.fill(null)
								.map((i, idx) => (
									<ForecastItem
										key={idx}
										code={data.daily.weathercode[idx + 1]}
										label={new Date(data.daily.time[idx + 1])
											.toLocaleDateString()
											.slice(0, -5)}
										temperature={(
											(data.daily.temperature_2m_max[idx + 1] +
												data.daily.temperature_2m_min[idx + 1]) /
											2
										).toFixed(1)}
									/>
								))}
						{currentTab === 'day' &&
							Array(5)
								.fill(null)
								.map((i, idx) => (
									<ForecastItem
										key={idx}
										code={data.hourly.weathercode[6 + idx * 4]}
										label={`${6 + idx * 4}h`}
										temperature={data.hourly.temperature_2m[6 + idx * 4]}
									/>
								))}
					</ul>
				</section>
			)}
			<footer className='weather-container-footer'>
				<p>Mis à jour à {new Date(lastUpdate).toLocaleTimeString()}</p>
			</footer>
		</div>
	);
};

export default WeatherWidget;
