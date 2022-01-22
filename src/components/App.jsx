import React, { useState } from 'react'

import Search from './Search'
import WeatherWidget from './WeatherWidget'

const App = () => {

  const [location, setLocation] = useState({
    centre: {
      coordinates: [
        -1.171,
        46.1592
      ]
    },
    nom: 'La Rochelle'
  })

  const [longitude, latitude] = location.centre.coordinates

  return <main className="weather-container">
        <Search onSelect={setLocation} />
        <WeatherWidget
          cityName={location.nom}
          latitude={latitude}
          longitude={longitude}
        />
  </main>
}

export default App
