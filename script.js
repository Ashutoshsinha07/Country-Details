const countriesContainer = document.querySelector(".countries-container");
const filterByregion = document.querySelector(".filter-by-region");
let allcountriesdata;
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer"); // Consistent variable name

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allcountriesdata = data;
  });

filterByregion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByregion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countrycard = document.createElement("a");
    countrycard.href = `/country.html?name=${country.name.common}`;
    countrycard.classList.add("country-card");
    const cardHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag">
      <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Region:</b> ${country.region}</p>
        <p><b>Capital:</b> ${country.capital}</p>
      </div>
    `;
    countrycard.innerHTML = cardHTML;
    countriesContainer.append(countrycard);
  });
}

searchInput.addEventListener("input", (e) => {
  const filtercountries = allcountriesdata.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filtercountries);
});

// Function to apply theme based on saved theme
const applyTheme = (theme) => {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeChanger.innerHTML = '<i class="fa-regular fa-sun"></i> Light mode';
  } else {
    document.body.classList.remove("dark");
    themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i> Dark mode';
  }
};

// Function to toggle theme
const toggleTheme = () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
  applyTheme(localStorage.getItem("theme"));
};

// Apply theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
});

// Event listener for theme changer
themeChanger.addEventListener("click", () => {
  toggleTheme();
});
