import { useEffect, useState } from "react";
import CurrentWeather from "./components/current-weather";
import Search from "./components/search";
import Forecast from "./components/forecast";
import bgImage from "/images/background-day.png";
import { BACKEND_SERVER_URL } from "../env";
import ToggleUnit from "./components/toggle-unit";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const [searchData, setSearchData] = useState(null);

  const handleSearchChange = async () => {
    const [lat, lon] = searchData.value.split(" ");

    const apiURL = `${BACKEND_SERVER_URL}/api/data?lat=${lat}&lon=${lon}&unit=${
      isMetric ? "metric" : "imperial"
    }`;

    const fetchData = await fetch(apiURL);
    const fetchDataJSON = await fetchData.json();

    setCurrentWeather({
      city: searchData.label,
      ...fetchDataJSON.currentWeatherData,
    });
    setForecast({
      city: searchData.label,
      list: fetchDataJSON.forecastData.list,
    });
  };

  useEffect(() => {
    handleSearchChange()
      .then()
      .catch((err) => {
        console.log(err);
      });
  }, [isMetric, searchData]);

  // console.log(currentWeather);
  // console.log(forecast);

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-cover bg-center min-h-screen"
    >
      <div className="flex items-center justify-center pt-7">
        <Search
          onSearchChange={(data) => {
            setSearchData(data);
          }}
        />
        <ToggleUnit
          target={() => {
            setIsMetric((prev) => !prev);
          }}
          isMetric={isMetric}
        />
      </div>
      {currentWeather && <CurrentWeather data={currentWeather} />}

      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default App;
