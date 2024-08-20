function updateClock() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const hoursElement = document.querySelector(".hours");
  const minutesElement = document.querySelector(".minutes");
  const secondsElement = document.querySelector(".seconds");

  hoursElement.textContent = `${hours} :`;
  minutesElement.textContent = `${minutes} :`;
  secondsElement.textContent = seconds;

  console.log(`Время: ${hours}:${minutes}:${seconds}`);
}

setInterval(updateClock, 1000);

updateClock();

const forecast = document.querySelector(".forecast");
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=Brest&appid=a94d0a5ac08570add4b47b8da933f247&lang=ru`
)
  .then((response) => response.json())
  .then((data) => {
    const locationElement = document.querySelector(".location");
    locationElement.textContent = data.city.name;

    const temperatureElement = document.querySelector(".temperature");
    temperatureElement.textContent = Math.round(
      data.list[0].main.temp - 273.15
    );

    const weatherDescriptionElement = document.querySelector(
      ".weather_description"
    );
    weatherDescriptionElement.textContent = data.list[0].weather[0].description;

    const windDescriptionElement = document.querySelector(".wind");
    windDescriptionElement.textContent = data.list[0].wind.speed;

    const dateElement = document.querySelector(".date");
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString("by-BY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    for (let i = 0; i < 40; i += 8) {
      const forecastDayElement = document.querySelector(`.date-${i / 8 + 1}`);
      if (!forecastDayElement) break; 

      const date = new Date(data.list[i].dt * 1000);
      forecastDayElement.querySelector(".date-inner").textContent =
        date.toLocaleDateString("by-BY", {
          weekday: "short",
          day: "numeric",
          month: "long",
        });
      forecastDayElement.querySelector(".temperature-inner").textContent =
        Math.round(data.list[i].main.temp - 273.15);
      forecastDayElement.querySelector(
        ".weather-description-inner"
      ).textContent = data.list[i].weather[0].description;
    }
  });
