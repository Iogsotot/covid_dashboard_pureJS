/* eslint-disable no-console */
import isoCountries from './ISOCountries';

export default class Stats {
  constructor() {
    this.urls = {
      perCountryData: 'https://corona.lmao.ninja/v2/countries?sort=cases',
      totalData: 'https://corona.lmao.ninja/v2/all',
      allCountriesTimeline: 'https://disease.sh/v3/covid-19/historical?lastdays=all',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  async getDataFromUrl(url) {
    let covidData = null;
    const promise = await fetch(url);
    if (promise.ok) {
      covidData = await promise.json();
    } if (promise.status === 404) {
      console.log(404);
    } else {
      console.log('other errors');
    }
    return covidData;
  }

  async getAllCountryStats() {
    const url = this.urls.perCountryData;
    const covidData = await this.getDataFromUrl(url);
    // const countries = [];
    // function getCountries() {
    //   for (let i = 0; i < Object.keys(covidData).length; i += 1) {
    //     countries[i] = covidData[i].country;
    //   }
    //   return countries;
    // }
    // const countryIndex = getCountries().indexOf(countryName);

    // const covidDataPerCountries = {
    //   countries,
    //   countryISO: covidData[countryIndex].countryInfo.iso2,
    //   countryName: covidData[countryIndex].country,
    //   flag: covidData[countryIndex].countryInfo.flag,
    //   cases: covidData[countryIndex].cases,
    //   deaths: covidData[countryIndex].deaths,
    //   recovered: covidData[countryIndex].recovered,
    //   casesPerOneHundredThousand: Math.round(covidData[countryIndex].casesPerOneMillion / 10),
    //   deathsPerOneHundredThousand: Math.round(covidData[countryIndex].deathsPerOneMillion / 10),
    //   recoveredPerOneHundredThousand: Math.round(covidData[countryIndex].recoveredPerOneMillion
    //     / 10),
    //   todayCases: covidData[countryIndex].todayCases,
    //   todayDeaths: covidData[countryIndex].todayDeaths,
    //   todayRecovered: covidData[countryIndex].todayRecovered,
    //   todayCasesPerOneHundredThousand: ((covidData[countryIndex].todayCases
    //     / covidData[countryIndex].population) * 100000).toFixed(3),
    //   todayDeathsPerOneHundredThousand: ((covidData[countryIndex].todayDeaths
    //     / covidData[countryIndex].population) * 100000).toFixed(3),
    //   todayRecoveredPerOneHundredThousand: ((covidData[countryIndex].todayRecovered
    //     / covidData[countryIndex].population) * 100000).toFixed(3),
    //   updated: (new Date(covidData[countryIndex].updated)).toDateString(),
    // };
    // weight = 128KB
    // return covidDataPerCountries;
    return covidData;
  }

  async getTotalStats() {
    const url = this.urls.totalData;
    const covidData = await this.getDataFromUrl(url);
    const TotalCovidData = {
      total: covidData,
      active: covidData.active,
      cases: covidData.cases,
      deaths: covidData.deaths,
      recovered: covidData.recovered,
      casesPerOneHundredThousand: Math.round(covidData.casesPerOneMillion / 10),
      deathsPerOneHundredThousand: Math.round(covidData.deathsPerOneMillion / 10),
      recoveredPerOneHundredThousand: Math.round(covidData.recoveredPerOneMillion / 10),
      activePerOneHundredThousand: Math.round(covidData.activePerOneMillion / 10),
      todayCases: covidData.todayCases,
      todayActive: covidData.todayActive,
      todayDeaths: covidData.todayDeaths,
      todayRecovered: covidData.todayRecovered,
      todayCasesPerOneHundredThousand: Math.round((covidData.todayCases
        / covidData.population) * 100000),
      todayDeathsPerOneHundredThousand: Math.round((covidData.todayDeaths
        / covidData.population) * 100000),
      todayRecoveredPerOneHundredThousand: Math.round((covidData.todayRecovered
        / covidData.population) * 100000),
      updated: (new Date(covidData.updated)).toDateString(),
    };
    // weight = 553B
    return TotalCovidData;
  }

  async getTotalTimeline(countryName = null) {
    const url = this.urls.allCountriesTimeline;
    const covidData = await this.getDataFromUrl(url);

    const countries = [];
    function getCountries() {
      for (let i = 0; i < Object.keys(covidData).length; i += 1) {
        countries[i] = covidData[i].country;
      }
      const result = new Set(countries);
      return result;
    }

    let allCountriesTimeline = {
      covidData,
      countries: getCountries(),
    };
    if (countryName) {
      const countryIndex = getCountries().indexOf(countryName); // если нет в массиве, то -1

      allCountriesTimeline = {
        ...allCountriesTimeline,
        ...{
          countryName: covidData[countryIndex].country,
          cases: covidData[countryIndex].timeline.cases,
          deaths: covidData[countryIndex].timeline.deaths,
          recovered: covidData[countryIndex].timeline.recovered,
          fullDataForCountry: covidData[countryIndex],
        },
      };
    }
    // weight = 3.5 MB
    // return covidData;
    return allCountriesTimeline;
  }

  async prepareDataForMap() {
    const totalData = await this.prepareTotalDataForMap();
    const timelineData = await this.prepareAllCountriesTimelineForMap();
    return [totalData, timelineData];
  }

  async prepareTotalDataForMap() {
    this.totalData = await this.getTotalStats();
    return this.totalData;
  }

  async prepareAllCountriesTimelineForMap() {
    const allCountriesTimelineRawData = await this.getTotalTimeline();
    // this.allCountriesTimeline.covidData = this.allCountriesTimeline.covidData.filter((element)
    // => element.province == null)
    const result = allCountriesTimelineRawData.covidData.reduce((countries, element) => {
      if (!countries[element.country]) {
        countries[element.country] = element;
        delete countries[element.country].province;
      } else {
        Object.keys(element.timeline.cases).forEach((key) => {
          countries[element.country].timeline.cases[key] += element.timeline.cases[key];
          countries[element.country].timeline.recovered[key] += element.timeline.recovered[key];
          countries[element.country].timeline.deaths[key] += element.timeline.deaths[key];
        });
      }
      return countries;
    }, {});

    this.allCountriesTimeline = result;
  }
}
