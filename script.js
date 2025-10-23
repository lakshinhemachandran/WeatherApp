const input = document.querySelector('input');
const submitBtn = document.querySelector("#submit");
const temperature = document.querySelector("#temp");
const humidity = document.querySelector("#hmd");
const windSpeed = document.querySelector("#wndspd");
const cntr = document.querySelector(".cntr");
const title = document.querySelector("#title");

function capitalizeWords(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

async function getData() {
    const rawCity = input.value;*
    const city = rawCity.toLowerCase();
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=MBHKAEP57AZ5P4GPVUAFW8RMU&contentType=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        temperature.innerHTML = `${data.currentConditions.temp}&deg;`;
        humidity.innerHTML = `${data.currentConditions.humidity}%`;
        windSpeed.innerHTML = `${data.currentConditions.windspeed} MPH`;

        cntr.classList.remove("hide");
        title.innerHTML = `Weather in ${capitalizeWords(rawCity)}`;

        input.value = "";
    } catch (error) {
        console.error(error);
        title.innerHTML = `City Not Found`;
        cntr.classList.add("hide");
        input.value = "";
    }
}

submitBtn.addEventListener("click", getData);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") getData();
});
