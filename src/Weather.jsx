import React, { useState } from "react";


const api = {
  key: "546caddefad684837c4cac413266302b",
  base: "https://api.openweathermap.org/data/2.5/",
};
const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();

    return `${day}  ${date}  ${month}  ${year}`;
  };

  return (
    <>
      <div className="flex flex-col gap-8 py-4 w-[100vw] h-[94.5vh] items-center bg-[#ffe4c4]">
        <p className="font-bold text-4xl font-mono">Weather App</p>
        <input
          className="border-[2px] border-black rounded-2xl w-1/2 p-2 font-mono"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
          onKeyPress={search}
        />
        {typeof weather.main != "undefined" ? (
          <div className="flex flex-col items-center gap-4 bg-green-200 p-4 rounded-2xl shadow-2xl">
            <div className="font-bold font-mono text-2xl">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="font-bold font-mono text-2xl">{weather.main.temp} °C</div>
            <div className="font-bold font-mono text-2xl">{weather.weather[0].main}</div>
            <div className="font-bold font-mono text-2xl">{dateBuilder(new Date())}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Weather;



