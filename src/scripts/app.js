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
      const countryTemplate = document.createElement('li');
      countryTemplate.innerHTML = `
        <li class="countries__item">
          <span class="country__name">${this.perCountryStats[i].country}</span>
          <span class="country__cases--All-Abs show">${this.perCountryStats[i].cases}</span>
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
    this.countriesListDataControl();
  }

  countriesListDataControl() {
    const countriesListDataNameEl = document.querySelector('#countriesListDataName');
    const arrowLeftEl = document.querySelector('#arrowLeft');
    const arrowRightEl = document.querySelector('#arrowRight');
    this.statsList = document.querySelectorAll('.countries__list li');

    // console.log(this.statsList);
    arrowLeftEl.addEventListener('click', () => { this.statsToggle('left') });
    arrowRightEl.addEventListener('click', () => { this.statsToggle('right') });
  }

  statsToggle(direction) {
    let currentStats = 1;
    this.statsList.forEach(li => {
      let statsCollection = li.querySelectorAll('.countries__item > span');
      // console.log(statsCollection);
      if (direction === 'right') {
        for (let i = currentStats; i < statsCollection.length; i += 1) {
          if (statsCollection[i].classList.contains('show')) {
            if (i === statsCollection.length - 1) {
              console.log(statsCollection[1].innerText);
              statsCollection[i].classList.toggle('show');
              statsCollection[1].classList.toggle('show');
              i = 1;
              currentStats = 1;
              break;
            }
            statsCollection[i].classList.toggle('show');
            statsCollection[i + 1].classList.toggle('show');
            currentStats += 1;
            break;
          }
        }
      }
      if (direction === 'left') {
        for (let i = currentStats; i < statsCollection.length; i += 1) {
          if (statsCollection[i].classList.contains('show')) {
            if (i === 1) {
              // console.log(statsCollection[1].innerText);
              statsCollection[i].classList.toggle('show');
              statsCollection[1].classList.toggle('show');
              i = 1;
              currentStats = 1;
              break;
            }
            statsCollection[i].classList.toggle('show');
            statsCollection[i - 1].classList.toggle('show');
            currentStats -= 1;
            break;
          }
        }
      }
    });

  }

  addWorldStats() {
    const dateUpdateEl = document.querySelector('#dateUpdate');    
    this.worldTimeToggleEl  = document.querySelector('#worldTimeToggle');
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

    // worldCasesEl.innerText = '89898';
  
    // если чекбокc time checked то (today) && чекбокс type !checked то (Absolute)
    if (this.worldTimeToggleEl.checked && !this.worldTypeToggleEl.checked) {
      // worldCasesEl.innerText = 'today Abs';
      worldCasesEl.innerText = this.totalData.todayCases;
      worldDeathsEl.innerText = this.totalData.todayDeaths;
      worldActiveEl.innerText = 'no data for this parameter for today';
      worldRecoveredEl.innerText = this.totalData.todayRecovered;
    }
    // если чекбокс time !checked (All) && чекбокс type !checked то (Absolute)
    if (!this.worldTimeToggleEl.checked && !this.worldTypeToggleEl.checked) {
      // worldCasesEl.innerText = 'All Abs';
      worldCasesEl.innerText = this.totalData.cases;
      worldDeathsEl.innerText = this.totalData.deaths;
      worldActiveEl.innerText = this.totalData.active;
      worldRecoveredEl.innerText = this.totalData.recovered;
    }
    // если чекбокс time checked (All) && чекбокс type checked то (Per100)
    if (!this.worldTimeToggleEl.checked && this.worldTypeToggleEl.checked) {
      // worldCasesEl.innerText = 'All per100';
      worldCasesEl.innerText = this.totalData.casesPerOneHundredThousand;
      worldDeathsEl.innerText = this.totalData.deathsPerOneHundredThousand;
      worldActiveEl.innerText = this.totalData.activePerOneHundredThousand;
      worldRecoveredEl.innerText = this.totalData.recoveredPerOneHundredThousand;
    }
    // если чекбокс time checked (today) && чекбокс type checked то (Per100)
    if (this.worldTimeToggleEl.checked && this.worldTypeToggleEl.checked) {
      // worldCasesEl.innerText = 'today per100';
      worldCasesEl.innerText = this.totalData.todayCasesPerOneHundredThousand;
      worldDeathsEl.innerText = this.totalData.todayDeathsPerOneHundredThousand;
      worldActiveEl.innerText = 'no data for this parameter for today';
      worldRecoveredEl.innerText = this.totalData.todayRecoveredPerOneHundredThousand;
    }
  }

}

const app = new App();
app.init();
