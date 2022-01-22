import { useState, useEffect, useCallback } from 'react';

const baseUrl = 'https://api.open-meteo.com/v1/forecast';

const useOpenMeteo = (settings) => {
	const { latitude, longitude, hourlyVars, dailyVars, timezone, interval } =
		settings;

	const [state, setState] = useState({
		data: null,
		lastUpdate: null,
	});

	const refresh = useCallback(() => {
		fetch(
			`${baseUrl}?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyVars.join(
				','
			)}&daily=${dailyVars.join(',')}&timezone=${timezone}`
		)
			.then((res) => res.json())
			.then((data) => {
				setState({
					data,
					lastUpdate: Date.now(),
				});
			});
	}, [latitude, longitude, hourlyVars, dailyVars, timezone]);

	useEffect(() => {
		refresh();
		const timer = setInterval(() => {
			refresh();
		}, interval);

		return () => {
			clearInterval(timer);
		};
	}, [interval, refresh]);

	return {
		...state,
		refresh,
	};
};

export default useOpenMeteo;
