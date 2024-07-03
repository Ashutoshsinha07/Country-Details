const countryName = new URLSearchParams(location.search).get("name");
const flagImg = document.querySelector(".country-details img");
const Name = document.querySelector(".country-details h1");
const nativename = document.querySelector(".nativename");
const population = document.querySelector(".population");
const Region = document.querySelector(".region");
const subRegion = document.querySelector(".subregion");
const capital = document.querySelector(".captial");
const topleveldomain = document.querySelector(".Topleveldomain");
const currency = document.querySelector(".currencies");
const lang = document.querySelector(".languages");
const bordercountries = document.querySelector(".border-countries");
const themechanger = document.querySelector(".theme-changer");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true `)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    flagImg.src = country.flags.svg;
    Name.innerText = country.name.common;
    population.innerText = country.population;
    Region.innerText = country.region;

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }
    if (country.capital) {
      capital.innerText = country.capital?.[0];
    }
    topleveldomain.innerText = country.tld;

    if (country.name.nativename) {
      nativename.innerText = Object.values(country.name.nativeName[0].common);
    } else {
      nativename.innerText = country.name.common;
    }
    if (country.currencies) {
      currency.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(",");
    }
    if (country.languages) {
      lang.innerText = Object.values(country.languages).join(",");
    }
    if (country.borders) {
      country.borders.forEach((border) => {
        console.log(border);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            console.log(borderCountry);
            const borderCountrytag = document.createElement("a");
            borderCountrytag.innerText = borderCountry.name.common;
            borderCountrytag.href = `country.html?name=${borderCountry.name.common}`;
            console.log(borderCountrytag);
            bordercountries.append(borderCountrytag);
          });
      });
    }
  });
themechanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
