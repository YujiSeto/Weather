document.querySelector(".search").addEventListener("submit", async (event) => {
  event.preventDefault();

  let input = document.querySelector("#searchInput").value;

  if (input !== "") {
    clearInfo();
    showWarning("Loading...");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=${getApi(
      "YZfZbX9XYcfXYcZaYZXdeZeXYZ3aXY87ZXdY5X8XZXXY7acXb3X7eXZX9XaZY9aZX3dYZX25Y"
    )}&units=metric`;

    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning("City not found");
    }
  } else {
    clearInfo();
  }
});

function showInfo(json) {
  showWarning("");

  document.querySelector(".title").innerHTML = `${json.name}, ${json.country}`;
  document.querySelector(".tempValue").innerHTML = `${json.temp} <sup>°C</sup>`;
  document.querySelector(
    ".windValue"
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`;

  document
    .querySelector(".temp img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );

  document.querySelector(".windPointer").style.transform = `rotate(${
    json.windAngle - 90
  }deg)`;

  document.querySelector(".result").style.display = "block";
}

function showWarning(msg) {
  document.querySelector(".warning").innerHTML = msg;
}

function clearInfo() {
  showWarning("");
  document.querySelector(".result").style.display = "none";
}

function getApi(raw) {
  return raw.replace(/[XYZ]/g, "");
}
