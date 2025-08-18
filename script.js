document.querySelector(".search").addEventListener("submit", async (event) => {
  event.preventDefault();

  let input = document.querySelector("#searchInput").value;

  if (input !== "") {
    showWarning("Loading...");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=${getCleanApiKey(
      "fb9XcfYcaZdee3a87d587acb37e9a9a3d25"
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
      showWarning("City not found");
    }
  }
});

function showInfo(json) {
  showWarning("");

  document.querySelector(".result").style.display = "block";
}

function showWarning(msg) {
  document.querySelector(".warning").innerHTML = msg;
}

function getCleanApiKey(rawKey) {
  return rawKey.replace(/[XYZ]/g, "");
}
