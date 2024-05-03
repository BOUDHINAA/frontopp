import React, { useState, useEffect } from 'react';
function DashboardCard12() {
  const [weather, setWeather] = useState({
    temperature: 25,
    description: 'Sunny',
  });

  useEffect(() => {
    // Simulate updating weather data every 5 seconds
    const intervalId = setInterval(() => {
      setWeather({
        temperature: getRandomInt(15, 35), // Generate a random temperature between 15 and 35 Celsius
        description: getRandomWeatherCondition(),
      });
    }, 5000);

    // Clean up interval
    return () => clearInterval(intervalId);
  }, []);

  // Function to generate a random integer between min and max
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to get a random weather condition
  const getRandomWeatherCondition = () => {
    const conditions = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy', 'Thunderstorm', 'Snowy'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  };

  // Function to get the URL for the weather icon based on the weather description
  const getWeatherIconUrl = () => {
    return `https://www.metaweather.com/static/img/weather/${weather.description.toLowerCase()}.svg`;
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Today's Weather</h2>
      </header>
      <div className="p-3">
        {/* Card content */}
        {/* Weather */}
        <div className="my-4">
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Weather
          </header>
          <div className="flex items-center justify-between px-4 py-2">
            <div>
              <p className="text-lg font-medium text-slate-800 dark:text-slate-100">{weather.description}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{weather.temperature}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard12;
