/* eslint-disable */
import '../styles/style.scss';
import isoCountries from './ISOCountries';

import Stats from './Stats';
import Map from './Map';
// import { for } from 'core-js/fn/symbol';

export default class App {
  constructor() {
    this.stats = new Stats();
    this.createCountriesList();
    this.currentStatsIndex = 0;
  }

  async init() {
    const data = await this.stats.prepareDataForMap();
    [this.totalData, this.allCountriesTimeline] = data;
    this.totalData = await this.stats.getTotalStats();
    this.allCountriesTimeline = await this.stats.getTotalTimeline();
    this.map = new Map(this.totalData, this.allCountriesTimeline);
    // console.log(this.allCountriesTimeline.covidData);
    // console.log(this.totalData);
    this.addWorldStats();
    this.worldStatsUpdate();
  }

  async createCountriesList() {
    const countriesListEl = document.querySelector('#countriesList');

    // переделать получаемый список стран на список совпадений isoList и приходящей инфы от апи
    this.perCountryStats = await this.stats.getAllCountryStats();
    // this.countriesList = Object.keys(isoCountries);
    this.countriesList = Object.keys(this.perCountryStats);

    for (let i = 0; i < this.countriesList.length; i++) {
      if (this.perCountryStats[i].countryInfo.iso2) {
        const countryTemplate = document.createElement('li');
        countryTemplate.innerHTML = `
        <li class="countries__item" data_iso2="${this.perCountryStats[i].countryInfo.iso2}">
          <span class="country__name">${this.perCountryStats[i].country}</span>
          <span class="country__stats">
            <span class="country__cases--All-Abs show">${this.perCountryStats[i].cases}</span>
            <span class="country__active--All-Abs">${this.perCountryStats[i].active}</span>
            <span class="country__deaths--All-Abs">${this.perCountryStats[i].deaths}</span>
            <span class="country__recovered--All-Abs">${this.perCountryStats[i].recovered}</span>

            <span class="country__cases--Today-Abs">${this.perCountryStats[i].todayCases}</span>
            <span class="country__deaths--Today-Abs">${this.perCountryStats[i].todayDeaths}</span>
            <span class="country__recovered--Today-Abs">${this.perCountryStats[i].todayRecovered}</span>

            <span class="country__cases--All-Per100k">${((this.perCountryStats[i].cases / this.perCountryStats[i].population) * 100000).toFixed(2)}</span>
            <span class="country__deaths--All-Per100k">${((this.perCountryStats[i].deaths / this.perCountryStats[i].population) * 100000).toFixed(2)}</span>
            <span class="country__active--All-Per100k">${((this.perCountryStats[i].active / this.perCountryStats[i].population) * 100000).toFixed(2)}</span>
            <span class="country__recovered--All-Per100k">${((this.perCountryStats[i].recovered / this.perCountryStats[i].population) * 100000).toFixed(2)}</span>

            <span class="country__cases--Today-Per100k">${((this.perCountryStats[i].todayCases / this.perCountryStats[i].population) * 100000).toFixed(2)}</span>
            <span class="country__deaths--Today-Per100k">${((this.perCountryStats[i].todayDeaths / this.perCountryStats[i].population) * 100000).toFixed(2)}</span>
            <span class="country__recovered--Today-Per100k">${((this.perCountryStats[i].todayRecovered / this.perCountryStats[i].population) * 100000).toFixed(2)}</span>
          </span>
          <img src="${this.perCountryStats[i].countryInfo.flag}" alt="" class="flag" width="auto" height="14">
        </li>`;
        countriesListEl.innerHTML += countryTemplate.innerHTML;
      }
    }
    // console.log(Object.keys(isoCountries));
    this.countriesListDataControl();
  }

  countriesListDataControl() {
    this.countriesListDataNameEl = document.querySelector('#countriesListDataName');
    const arrowLeftEl = document.querySelector('#arrowLeft');
    const arrowRightEl = document.querySelector('#arrowRight');
    this.statsList = document.querySelectorAll('.countries__list li');


    // console.log(this.statsList);
    arrowLeftEl.addEventListener('click', () => { 
      this.switchStatsList('left'); 
      this.switchStatsListTitle();
    });
    arrowRightEl.addEventListener('click', () => { 
      this.switchStatsList('right'); 
      this.switchStatsListTitle();
    });
  }

  switchStatsListTitle() {
    // да, это магические числа.
    console.log(this.currentStatsIndex);
    switch (this.currentStatsIndex) {
      case 0:
        this.countriesListDataNameEl.innerText = 'All cases absolute';
        break;
      case 1:
        this.countriesListDataNameEl.innerText = 'All active absolute';
        break;
      case 2:
        this.countriesListDataNameEl.innerText = 'All deaths absolute';
        break;
      case 3:
        this.countriesListDataNameEl.innerText = 'All recovered absolute';
        break;
      case 4:
        this.countriesListDataNameEl.innerText = 'Today cases absolute';
        break;
      case 5:
        this.countriesListDataNameEl.innerText = 'Today deaths absolute';
        break;
      case 6:
        this.countriesListDataNameEl.innerText = 'Today recovered absolute';
        break;
      case 7:
        this.countriesListDataNameEl.innerText = 'All cases per 100k';
        break;
      case 8:
        this.countriesListDataNameEl.innerText = 'All deaths per 100k';
        break;
      case 9:
        this.countriesListDataNameEl.innerText = 'All active per 100k';
        break;
      case 10:
        this.countriesListDataNameEl.innerText = 'All recovered per 100k';
        break;
      case 11:
        this.countriesListDataNameEl.innerText = 'Today cases per 100k';
        break;
      case 12:
        this.countriesListDataNameEl.innerText = 'Today deaths per 100k';
        break;
      case 13:
        this.countriesListDataNameEl.innerText = 'Today recovered per 100k';
        break;
      default:
        break;
    }
  }

  switchStatsList(direction) {
    let statsCollection = this.statsList[0].querySelectorAll('.country__stats > span');
    let previousIndex = this.currentStatsIndex;

    if (direction === 'right') {
      if (this.currentStatsIndex + 1 === statsCollection.length) {
        this.currentStatsIndex = 0;
      } else {
        this.currentStatsIndex += 1;
      }
    }
    if (direction === 'left') {
      if (this.currentStatsIndex - 1 < 0) {
        this.currentStatsIndex = statsCollection.length - 1;
      } else {
        this.currentStatsIndex -= 1;
      }
    }
    this.statsList.forEach(li => {
      statsCollection = li.querySelectorAll('.country__stats > span');
      statsCollection[previousIndex].classList.toggle('show');
      statsCollection[this.currentStatsIndex].classList.toggle('show');
    });
  }

  addWorldStats() {
    const dateUpdateEl = document.querySelector('#dateUpdate');
    this.worldTimeToggleEl = document.querySelector('#worldTimeToggle');
    this.worldTypeToggleEl = document.querySelector('#worldTypeToggle');

    dateUpdateEl.innerText = this.totalData.updated;
    console.log(this.totalData);
    this.worldStatsUpdate();

    this.worldTimeToggleEl.addEventListener('change', () => {
      this.worldStatsUpdate();
    });
    this.worldTypeToggleEl.addEventListener('change', () => {
      this.worldStatsUpdate()
    }
    );
  }

  worldStatsUpdate() {
    const worldCasesEl = document.querySelector('#worldCases');
    const worldDeathsEl = document.querySelector('#worldDeaths');
    const worldActiveEl = document.querySelector('#worldActive');
    const worldRecoveredEl = document.querySelector('#worldRecovered');
    const worldCasesMiniEl = document.querySelector('#worldCasesMini');
    const worldDeathsMiniEl = document.querySelector('#worldDeathsMini');
    const worldRecoveredMiniEl = document.querySelector('#worldRecoveredMini');

    // если чекбокc time checked то (today) && чекбокс type !checked то (Absolute)
    if (this.worldTimeToggleEl.checked && !this.worldTypeToggleEl.checked) {
      worldCasesEl.innerText = this.totalData.todayCases;
      worldCasesMiniEl.innerText = this.totalData.todayCases;
      worldDeathsEl.innerText = this.totalData.todayDeaths;
      worldDeathsMiniEl.innerText = this.totalData.todayDeaths;
      worldActiveEl.innerText = 'no data for today';
      worldRecoveredEl.innerText = this.totalData.todayRecovered;
      worldRecoveredMiniEl.innerText = this.totalData.todayRecovered;
    }
    // если чекбокс time !checked (All) && чекбокс type !checked то (Absolute)
    if (!this.worldTimeToggleEl.checked && !this.worldTypeToggleEl.checked) {
      worldCasesEl.innerText = this.totalData.cases;
      worldCasesMiniEl.innerText = this.totalData.cases;
      worldDeathsEl.innerText = this.totalData.deaths;
      worldDeathsMiniEl.innerText = this.totalData.deaths;
      worldActiveEl.innerText = this.totalData.active;
      worldRecoveredEl.innerText = this.totalData.recovered;
      worldRecoveredMiniEl.innerText = this.totalData.recovered;
    }
    // если чекбокс time checked (All) && чекбокс type checked то (Per100)
    if (!this.worldTimeToggleEl.checked && this.worldTypeToggleEl.checked) {
      worldCasesEl.innerText = this.totalData.casesPerOneHundredThousand;
      worldCasesMiniEl.innerText = this.totalData.casesPerOneHundredThousand;
      worldDeathsEl.innerText = this.totalData.deathsPerOneHundredThousand;
      worldDeathsMiniEl.innerText = this.totalData.deathsPerOneHundredThousand;
      worldActiveEl.innerText = this.totalData.activePerOneHundredThousand;
      worldRecoveredEl.innerText = this.totalData.recoveredPerOneHundredThousand;
      worldRecoveredMiniEl.innerText = this.totalData.recoveredPerOneHundredThousand;
    }
    // если чекбокс time checked (today) && чекбокс type checked то (Per100)
    if (this.worldTimeToggleEl.checked && this.worldTypeToggleEl.checked) {
      worldCasesEl.innerText = this.totalData.todayCasesPerOneHundredThousand;
      worldCasesMiniEl.innerText = this.totalData.todayCasesPerOneHundredThousand;
      worldDeathsEl.innerText = this.totalData.todayDeathsPerOneHundredThousand;
      worldDeathsMiniEl.innerText = this.totalData.todayDeathsPerOneHundredThousand;
      worldActiveEl.innerText = 'no data for today';
      worldRecoveredEl.innerText = this.totalData.todayRecoveredPerOneHundredThousand;
      worldRecoveredMiniEl.innerText = this.totalData.todayRecoveredPerOneHundredThousand;
    }
  }

}

const app = new App();
app.init();
