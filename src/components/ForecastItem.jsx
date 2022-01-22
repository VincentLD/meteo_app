import React from 'react';
import PropTypes from 'prop-types';

import WeatherCode from './WeatherCode';

const ForecastItem = (props) => {
	const { code, label, temperature } = props;

	return (
		<li className='forecast-item'>
			<p>{label}</p>
			<WeatherCode code={code} />
			<p className='forecast-item-temp'>{temperature}</p>
		</li>
	);
};

ForecastItem.propTypes = {
	code: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
	temperature: PropTypes.number.isRequired,
};

export default ForecastItem;
