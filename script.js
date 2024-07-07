const countriesContainer = document.querySelector(".countries-container");
const filterByregion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");
const paginationControls = document.querySelector(".pagination-controls");

let allcountriesdata;

// Function to render countries with pagination
function renderCountries(data, currentPage = 1, countriesPerPage = 10) {
  countriesContainer.innerHTML = "";
  const start = (currentPage - 1) * countriesPerPage;
  const end = start + countriesPerPage;
  const paginatedCountries = data.slice(start, end);

  paginatedCountries.forEach((country) => {
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

  renderPaginationControls(data.length, countriesPerPage, currentPage);
}

// Function to render pagination controls
function renderPaginationControls(
  totalCountries,
  countriesPerPage,
  currentPage
) {
  paginationControls.innerHTML = "";

  const totalPages = Math.ceil(totalCountries / countriesPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.classList.add("page-button");
    if (i === currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.addEventListener("click", () => {
      renderCountries(allcountriesdata, i, countriesPerPage);
    });
    paginationControls.append(pageButton);
  }
}

// Initial render with pagination
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data, 1, 10); // Show 10 countries per page initially
    allcountriesdata = data;
  });

// Event listener for search input
searchInput.addEventListener("input", (e) => {
  const filtercountries = allcountriesdata.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filtercountries, 1, 10); // Reset to page 1 when filtering
});

// Event listener for region filter
filterByregion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByregion.value}`)
    .then((res) => res.json())
    .then((data) => {
      renderCountries(data, 1, 10); // Reset to page 1 when filtering
    });
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
