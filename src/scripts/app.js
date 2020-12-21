import '../styles/style.scss';
import isoCountries from './ISOCountries';

import Stats from './Stats';
import Map from './Map';

export default class App {
  constructor() {
    this.stats = new Stats();
    this.createCountriesList();
  }

  async init() {
    const data = await this.stats.prepareDataForMap();
    [this.totalData, this.allCountriesTimeline] = data;
    this.totalData = await this.stats.getTotalStats();
    this.allCountriesTimeline = await this.stats.getTotalTimeline();
    this.map = new Map(this.totalData, this.allCountriesTimeline);
    // console.log(this.allCountriesTimeline.covidData);
    // console.log(this.totalData);
  }

  async createCountriesList() {
    const countriesListEl = document.querySelector('#countriesList');
    this.perCountryStats = await this.stats.getAllCountryStats();
    // this.countriesList = Object.keys(isoCountries);
    this.countriesList = Object.keys(this.perCountryStats);

    console.log(this.perCountryStats[0]);
    console.log(this.perCountryStats[0].active);

    for (let i = 0; i < this.countriesList.length; i++) {
      const countryTemplate = document.createElement('li');
      countryTemplate.innerHTML = `
        <li class="countries__item">
          <span class="country__name">${this.perCountryStats[i].country}</span>
          <span class="country__cases--All-Abs">${this.perCountryStats[i].cases}</span>
          <span class="country__active--All-Abs">${this.perCountryStats[i].active}</span>
          <span class="country__deaths--All-Abs">${this.perCountryStats[i].deaths}</span>
          <span class="country__recovered--All-Abs">${this.perCountryStats[i].recovered}</span>

          <span class="country__cases--Today-Abs">${this.perCountryStats[i].todayCases}</span>
          <span class="country__deaths--Today-Abs">${this.perCountryStats[i].todayDeaths}</span>
          <span class="country__recovered--Today-Abs">${this.perCountryStats[i].todayRecovered}</span>

          <span class="country__cases--All-Per100k">${((this.perCountryStats[i].cases / this.perCountryStats[i].population) * 100000).toFixed(3)}</span>
          <span class="country__deaths--All-Per100k">${((this.perCountryStats[i].deaths / this.perCountryStats[i].population) * 100000).toFixed(3)}</span>
          <span class="country__active--All-Per100k">${((this.perCountryStats[i].active / this.perCountryStats[i].population) * 100000).toFixed(3)}</span>
          <span class="country__recovered--All-Per100k">${((this.perCountryStats[i].recovered / this.perCountryStats[i].population) * 100000).toFixed(3)}</span>

          <span class="country__cases--Today-Per100k">${((this.perCountryStats[i].todayCases / this.perCountryStats[i].population) * 100000).toFixed(3)}</span>
          <span class="country__deaths--Today-Per100k">${((this.perCountryStats[i].todayDeaths / this.perCountryStats[i].population) * 100000).toFixed(3)}</span>
          <span class="country__recovered--Today-Per100k">${((this.perCountryStats[i].todayRecovered / this.perCountryStats[i].population) * 100000).toFixed(3)}</span>
          <img src="${this.perCountryStats[i].countryInfo.flag}" alt="" class="flag" width="auto" height="14">
        </li>`;
      countriesListEl.innerHTML += countryTemplate.innerHTML;
    }
    // console.log(Object.keys(isoCountries));
  }
}

const app = new App();
app.init();
