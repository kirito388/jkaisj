const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
  interval: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".header__content form", {
  ...scrollRevealOption,
  delay: 2500,
});

ScrollReveal().reveal(".choose__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".choose__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".choose__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".choose__list li", {
  ...scrollRevealOption,
  delay: 1500,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 0,
  loop: true,
});

ScrollReveal().reveal(".explore__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".explore__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".explore__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".explore__content .section__description", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".explore__content .explore__btn", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".explore__grid div", {
  duration: 1000,
  delay: 2500,
  interval: 500,
});

const next = document.getElementById("next");
const prev = document.getElementById("prev");
const clientCards = Array.from(document.querySelectorAll(".client__card"));

next.addEventListener("click", (e) => {
  for (let index = 0; index < clientCards.length; index++) {
    if (clientCards[index].classList.contains("active")) {
      const nextIndex = (index + 1) % clientCards.length;
      clientCards[index].classList.remove("active");
      clientCards[nextIndex].classList.add("active");
      break;
    }
  }
});

prev.addEventListener("click", (e) => {
  for (let index = 0; index < clientCards.length; index++) {
    if (clientCards[index].classList.contains("active")) {
      const prevIndex = (index ? index : clientCards.length) - 1;
      clientCards[index].classList.remove("active");
      clientCards[prevIndex].classList.add("active");
      break;
    }
  }
});

ScrollReveal().reveal(".subscribe__container .section__header", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".subscribe__container .section__description", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".subscribe__container form", {
  ...scrollRevealOption,
  delay: 1000,
});
const apiKey = 'YOUR_API_KEY'; // Replace with your YouTube API Key
const searchQuery = 'Khuvsgul Lake'; // The term you want to search for

fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data.items); // The array of video search results
  })
  .catch(error => console.error('Error:', error));
  const API_KEY = "1d3c7629e6a7c3c10edce00c466a40a8";

  // Get elements
  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");
  const cityEl = document.getElementById("city");
  const tempEl = document.getElementById("temp");
  const descriptionEl = document.getElementById("description");
  const humidityEl = document.getElementById("humidity");
  const windEl = document.getElementById("wind");
  const forecastList = document.querySelector(".forecast-list");
  
  // Map description to emoji
  function getWeatherEmoji(description) {
    if (description.includes("clear")) return "☀️";
    if (description.includes("cloud")) return "☁️";
    if (description.includes("rain")) return "🌧";
    if (description.includes("snow")) return "❄️";
    if (description.includes("storm")) return "⛈";
    return "🌤";
  }
  
  // Fetch current weather
  function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const description = data.weather[0].description;
        cityEl.textContent = data.name;
        tempEl.textContent = `${Math.round(data.main.temp)}°C`;  // Corrected template literal
        descriptionEl.textContent = description;
        humidityEl.textContent = `${data.main.humidity}%`;  // Corrected template literal
        windEl.textContent = `${data.wind.speed} km/h`;  // Corrected template literal
        const emoji = getWeatherEmoji(description.toLowerCase());
        document.getElementById("current-weather").innerHTML = `${emoji} ${tempEl.textContent} | ${description}`;  // Corrected template literal
        fetchForecast(city);  // Fetch the forecast for the city
      })
      .catch((error) => alert("Error fetching weather data. Check the city name!"));
  }
  
  // Fetch 7-day forecast
  function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=7&appid=${API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        forecastList.innerHTML = "";
        data.list.forEach((forecast) => {
          const emoji = getWeatherEmoji(forecast.weather[0].description.toLowerCase());
          forecastList.innerHTML += `
            <li class="forecast-item">
              <h4>${new Date(forecast.dt_txt).toLocaleDateString("en-US", { weekday: "long" })}</h4>
              <span class="emoji">${emoji}</span>
              <p>${forecast.weather[0].description}</p>
              <p>${Math.round(forecast.main.temp)}°C</p>
            </li>`;
        });
      })
      .catch((error) => alert("Error fetching forecast data."));
  }
  
  // Add event listener
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  });
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    const email = document.querySelector('#email').value;
  
    // Example: Log the email or send it via an API
    console.log('Email:', email);
  
    // Use fetch or another method to send the data
    fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
  });
    