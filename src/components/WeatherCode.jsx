import React from 'react'
import cloudsIcon from '../assets/img/clouds.png'
import fogIcon from '../assets/img/fog.png'
import heavyRainIcon from '../assets/img/heavy-rain.png'
import heavySnowIcon from '../assets/img/heavy-snow.png'
import partialSunIcon from '../assets/img/partial-sun.png'
import slightSnowIcon from '../assets/img/slight-snow.png'
import sunRainIcon from '../assets/img/sun-rain.png'
import sunshineIcon from '../assets/img/sunshine.png'
import thunderstormIcon from '../assets/img/thunderstorm.png'

const codes =  new Map([
    [3, cloudsIcon],
    [45, fogIcon],
    [65, heavyRainIcon],
    [75, heavySnowIcon],
    [71, slightSnowIcon],
    [2, partialSunIcon],
    [51, sunRainIcon],
    [0, sunshineIcon],
    [95, thunderstormIcon]
]);

const WeatherCode = props => {
    return<img 
    src= {codes.get(props.code) || cloudsIcon}
    alt="sunshine" 
    className="weathercode-img"
/>
}

export default WeatherCode;