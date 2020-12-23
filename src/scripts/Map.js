/* eslint-disable */
// этот код большей своей частью взят с сайта amcharts

/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';

import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import populations from './Populations';

class Map {
  constructor(covid_total_timeline, covid_world_timeline) {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    const numberFormatter = new am4core.NumberFormatter();
    const backgroundColor = am4core.color('#3a3a3a');
    const activeColor = am4core.color('coral');
    const confirmedColor = am4core.color('white');
    const recoveredColor = am4core.color('rgb(67, 192, 67)');
    const deathsColor = am4core.color('rgb(255, 0, 0)');

    // console.log(covid_total_timeline)

    // for an easier access by key
    const colors = {
      active: activeColor, confirmed: confirmedColor, recovered: recoveredColor, deaths: deathsColor,
    };

    const countryColor = am4core.color('black');
    const countryStrokeColor = am4core.color('red');
    const buttonStrokeColor = am4core.color('#ffffff');
    const countryHoverColor = am4core.color('#4e4e4e');
    const activeCountryColor = am4core.color('#530000');

    let currentIndex;
    let currentCountry = 'World';

    // last date of the data
    const lastDate = new Date(covid_total_timeline[covid_total_timeline.length - 1].date);
    let currentDate = lastDate;

    let currentPolygon;

    let countryDataTimeout;

    let currentType;

    let currentTypeName;

    let sliderAnimation;

    let perCapita = false;

    // make a map of country indexes for later use
    const countryIndexMap = {};
    const { list } = covid_world_timeline[covid_world_timeline.length - 1];
    for (var i = 0; i < list.length; i++) {
      const country = list[i];
      countryIndexMap[country.id] = i;
    }

    // calculated active cases in world data (active = confirmed - recovered)
    for (var i = 0; i < covid_total_timeline.length; i++) {
      const di = covid_total_timeline[i];
      di.active = di.confirmed - di.recovered;
    }

    // function that returns current slide
    // if index is not set, get last slide
    function getSlideData(index) {
      if (index == undefined) {
        index = covid_world_timeline.length - 1;
      }

      const data = covid_world_timeline[index];

      // augment with names
      // for (var i = 0; i < data.list.length; i++) {
      // data.list[i].name = idToName(data.list[i].id);
      // }

      return data;
    }

    // get slide data
    const slideData = getSlideData();

    // as we will be modifying raw data, make a copy
    const mapData = JSON.parse(JSON.stringify(slideData.list));

    // remove items with 0 values for better performance
    for (var i = mapData.length - 1; i >= 0; i--) {
      if (mapData[i].confirmed == 0) {
        mapData.splice(i, 1);
      }
    }

    const max = { confirmed: 0, recovered: 0, deaths: 0 };
    let maxPC = {
      confirmed: 0, recovered: 0, deaths: 0, active: 0,
    };

    // the last day will have most
    for (var i = 0; i < mapData.length; i++) {
      const di = mapData[i];
      if (di.confirmed > max.confirmed) {
        max.confirmed = di.confirmed;
      }
      if (di.recovered > max.recovered) {
        max.recovered = di.recovered;
      }
      if (di.deaths > max.deaths) {
        max.deaths = di.deaths;
      }
      max.active = max.confirmed;
    }

    /// ///////////////////////////////////////////////////////////////////////////
    // LAYOUT & CHARTS
    /// ///////////////////////////////////////////////////////////////////////////

    // main container
    // https://www.amcharts.com/docs/v4/concepts/svg-engine/containers/
    const container = am4core.create('chartdiv', am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);

    container.tooltip = new am4core.Tooltip();
    container.tooltip.background.fill = am4core.color('#000000');
    container.tooltip.background.stroke = activeColor;
    container.tooltip.fontSize = '0.9em';
    container.tooltip.getFillFromObject = false;
    container.tooltip.getStrokeFromObject = false;

    // MAP CHART
    // https://www.amcharts.com/docs/v4/chart-types/map/
    const mapChart = container.createChild(am4maps.MapChart);
    mapChart.height = am4core.percent(80);
    mapChart.zoomControl = new am4maps.ZoomControl();
    mapChart.zoomControl.align = 'right';
    mapChart.zoomControl.marginRight = 15;
    mapChart.zoomControl.valign = 'middle';
    mapChart.homeGeoPoint = { longitude: 0, latitude: -2 };

    // by default minus button zooms out by one step, but we modify the behavior so when user clicks on minus, the map would fully zoom-out and show world data
    mapChart.zoomControl.minusButton.events.on('hit', showWorld);
    // clicking on a "sea" will also result a full zoom-out
    mapChart.seriesContainer.background.events.on('hit', showWorld);
    mapChart.seriesContainer.background.events.on('over', resetHover);
    mapChart.seriesContainer.background.fillOpacity = 0;
    mapChart.zoomEasing = am4core.ease.sinOut;

    // https://www.amcharts.com/docs/v4/chart-types/map/#Map_data
    // you can use more accurate world map or map of any other country - a wide selection of maps available at: https://github.com/amcharts/amcharts4-geodata
    mapChart.geodata = am4geodata_worldLow;

    // Set projection
    // https://www.amcharts.com/docs/v4/chart-types/map/#Setting_projection
    // instead of Miller, you can use Mercator or many other projections available: https://www.amcharts.com/demos/map-using-d3-projections/
    mapChart.projection = new am4maps.projections.Miller();
    mapChart.panBehavior = 'move';

    // when map is globe, beackground is made visible
    mapChart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.05;
    mapChart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#ffffff');
    mapChart.backgroundSeries.hidden = true;

    // Map polygon series (defines how country areas look and behave)
    const polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.dataFields.id = 'id';
    polygonSeries.dataFields.value = 'confirmedPC';
    polygonSeries.interpolationDuration = 0;

    polygonSeries.exclude = ['AQ']; // Antarctica is excluded in non-globe projection
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;
    // this helps to place bubbles in the visual middle of the area
    polygonSeries.calculateVisualCenter = true;
    polygonSeries.data = mapData;

    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = countryColor;
    polygonTemplate.fillOpacity = 1;
    polygonTemplate.stroke = countryStrokeColor;
    polygonTemplate.strokeOpacity = 0.15;
    polygonTemplate.setStateOnChildren = true;
    polygonTemplate.tooltipPosition = 'fixed';

    polygonTemplate.events.on('hit', handleCountryHit);
    polygonTemplate.events.on('over', handleCountryOver);
    polygonTemplate.events.on('out', handleCountryOut);

    polygonSeries.heatRules.push({
      target: polygonTemplate,
      property: 'fill',
      min: countryColor,
      max: countryColor,
      dataField: 'value',
    });

    // you can have pacific - centered map if you set this to -154.8
    mapChart.deltaLongitude = -10;

    // polygon states
    const polygonHoverState = polygonTemplate.states.create('hover');
    polygonHoverState.transitionDuration = 1400;
    polygonHoverState.properties.fill = countryHoverColor;

    const polygonActiveState = polygonTemplate.states.create('active');
    polygonActiveState.properties.fill = activeCountryColor;

    // Bubble series
    const bubbleSeries = mapChart.series.push(new am4maps.MapImageSeries());

    // console.log(bubbleSeries);
    bubbleSeries.data = JSON.parse(JSON.stringify(mapData));

    bubbleSeries.dataFields.value = 'confirmed';
    bubbleSeries.dataFields.id = 'id';

    // adjust tooltip
    bubbleSeries.tooltip.animationDuration = 0;
    bubbleSeries.tooltip.showInViewport = false;
    bubbleSeries.tooltip.background.fillOpacity = 0.2;
    bubbleSeries.tooltip.getStrokeFromObject = true;
    bubbleSeries.tooltip.getFillFromObject = false;
    bubbleSeries.tooltip.background.fillOpacity = 0.2;
    bubbleSeries.tooltip.background.fill = am4core.color('#000000');

    const imageTemplate = bubbleSeries.mapImages.template;
    // if you want bubbles to become bigger when zoomed, set this to false
    imageTemplate.nonScaling = true;
    imageTemplate.strokeOpacity = 0;
    imageTemplate.fillOpacity = 0.55;
    imageTemplate.tooltipText = '{name}: [bold]{value}[/]';
    imageTemplate.applyOnClones = true;

    imageTemplate.events.on('over', handleImageOver);
    imageTemplate.events.on('out', handleImageOut);
    imageTemplate.events.on('hit', handleImageHit);

    // this is needed for the tooltip to point to the top of the circle instead of the middle
    imageTemplate.adapter.add('tooltipY', (tooltipY, target) => -target.children.getIndex(0).radius);

    // When hovered, circles become non-opaque
    const imageHoverState = imageTemplate.states.create('hover');
    imageHoverState.properties.fillOpacity = 1;

    // add circle inside the image
    const circle = imageTemplate.createChild(am4core.Circle);
    // this makes the circle to pulsate a bit when showing it
    circle.hiddenState.properties.scale = 0.0001;
    circle.hiddenState.transitionDuration = 2000;
    circle.defaultState.transitionDuration = 2000;
    circle.defaultState.transitionEasing = am4core.ease.elasticOut;
    // later we set fill color on template (when changing what type of data the map should show) and all the clones get the color because of this
    circle.applyOnClones = true;

    // heat rule makes the bubbles to be of a different width. Adjust min/max for smaller/bigger radius of a bubble
    bubbleSeries.heatRules.push({
      target: circle,
      property: 'radius',
      min: 3,
      max: 30,
      dataField: 'value',
    });

    // when data items validated, hide 0 value bubbles (because min size is set)
    bubbleSeries.events.on('dataitemsvalidated', () => {
      bubbleSeries.dataItems.each((dataItem) => {
        const { mapImage } = dataItem;
        const circle = mapImage.children.getIndex(0);
        if (mapImage.dataItem.value == 0) {
          circle.hide(0);
        } else if (circle.isHidden || circle.isHiding) {
          circle.show();
        }
      });
    });

    // this places bubbles at the visual center of a country
    imageTemplate.adapter.add('latitude', (latitude, target) => {
      const polygon = polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLatitude;
      }
      target.disabled = true;

      return latitude;
    });

    imageTemplate.adapter.add('longitude', (longitude, target) => {
      const polygon = polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLongitude;
      }
      target.disabled = true;

      return longitude;
    });

    // END OF MAP

    // top title
    const title = mapChart.titles.create();
    title.fontSize = '1.5em';
    title.text = 'COVID-19 Spread Data';
    title.align = 'left';
    title.horizontalCenter = 'left';
    title.marginLeft = 20;
    title.paddingBottom = 10;
    title.fill = am4core.color('#ffffff');
    title.y = 20;

    // // switch between map and globe
    // const mapGlobeSwitch = mapChart.createChild(am4core.SwitchButton);
    // mapGlobeSwitch.align = 'right';
    // mapGlobeSwitch.y = 15;
    // mapGlobeSwitch.leftLabel.text = 'Map';
    // mapGlobeSwitch.leftLabel.fill = am4core.color('#ffffff');
    // mapGlobeSwitch.rightLabel.fill = am4core.color('#ffffff');
    // mapGlobeSwitch.rightLabel.text = 'Globe';
    // mapGlobeSwitch.verticalCenter = 'top';

    // mapGlobeSwitch.events.on('toggled', () => {
    //   if (mapGlobeSwitch.isActive) {
    //     mapChart.projection = new am4maps.projections.Orthographic();
    //     mapChart.backgroundSeries.show();
    //     mapChart.panBehavior = 'rotateLongLat';
    //     polygonSeries.exclude = [];
    //   } else {
    //     mapChart.projection = new am4maps.projections.Miller();
    //     mapChart.backgroundSeries.hide();
    //     mapChart.panBehavior = 'move';
    //     removeAntarctica(mapData);
    //     polygonSeries.data = mapData;
    //     polygonSeries.exclude = ['AQ'];
    //   }
    // });

    // switch between map and globe
    const absolutePerCapitaSwitch = mapChart.createChild(am4core.SwitchButton);
    absolutePerCapitaSwitch.align = 'right';
    absolutePerCapitaSwitch.y = 15;
    absolutePerCapitaSwitch.leftLabel.text = 'Absolute';
    absolutePerCapitaSwitch.leftLabel.fill = am4core.color('#ffffff');
    absolutePerCapitaSwitch.rightLabel.fill = am4core.color('#ffffff');
    absolutePerCapitaSwitch.rightLabel.text = 'Per 100k';
    absolutePerCapitaSwitch.rightLabel.interactionsEnabled = true;
    absolutePerCapitaSwitch.rightLabel.tooltipText = 'When calculating max value, countries with population less than 100.000 are not included.';
    absolutePerCapitaSwitch.verticalCenter = 'top';

    absolutePerCapitaSwitch.events.on('toggled', () => {
      if (absolutePerCapitaSwitch.isActive) {
        bubbleSeries.hide(0);
        perCapita = true;
        bubbleSeries.interpolationDuration = 0;
        polygonSeries.heatRules.getIndex(0).max = colors[currentType];
        polygonSeries.heatRules.getIndex(0).maxValue = maxPC[currentType];
        polygonSeries.mapPolygons.template.applyOnClones = true;

        sizeSlider.hide();
        filterSlider.hide();
        sizeLabel.hide();
        filterLabel.hide();

        updateCountryTooltip();
      } else {
        perCapita = false;
        polygonSeries.interpolationDuration = 0;
        bubbleSeries.interpolationDuration = 1000;
        bubbleSeries.show();
        polygonSeries.heatRules.getIndex(0).max = countryColor;
        polygonSeries.mapPolygons.template.tooltipText = undefined;
        sizeSlider.show();
        filterSlider.show();
        sizeLabel.show();
        filterLabel.show();
      }
      polygonSeries.mapPolygons.each((mapPolygon) => {
        mapPolygon.fill = mapPolygon.fill;
        mapPolygon.defaultState.properties.fill = undefined;
      });
    });

    // buttons & chart container
    const buttonsAndChartContainer = container.createChild(am4core.Container);
    buttonsAndChartContainer.layout = 'vertical';
    buttonsAndChartContainer.height = am4core.percent(45); // make this bigger if you want more space for the chart
    buttonsAndChartContainer.width = am4core.percent(100);
    buttonsAndChartContainer.valign = 'bottom';

    // country name and buttons container
    const nameAndButtonsContainer = buttonsAndChartContainer.createChild(am4core.Container);
    nameAndButtonsContainer.width = am4core.percent(100);
    nameAndButtonsContainer.padding(0, 10, 5, 20);
    nameAndButtonsContainer.layout = 'horizontal';

    // name of a country and date label
    const countryName = nameAndButtonsContainer.createChild(am4core.Label);
    countryName.fontSize = '1.4rem';
    countryName.fill = am4core.color('#ffffff');
    countryName.valign = 'middle';

    // buttons container (active/confirmed/recovered/deaths)
    const buttonsContainer = nameAndButtonsContainer.createChild(am4core.Container);
    buttonsContainer.layout = 'grid';
    buttonsContainer.width = am4core.percent(100);
    buttonsContainer.x = 10;
    buttonsContainer.contentAlign = 'right';

    // Chart & slider container
    const chartAndSliderContainer = buttonsAndChartContainer.createChild(am4core.Container);
    chartAndSliderContainer.layout = 'vertical';
    chartAndSliderContainer.height = am4core.percent(100);
    chartAndSliderContainer.width = am4core.percent(100);
    chartAndSliderContainer.background = new am4core.RoundedRectangle();
    chartAndSliderContainer.background.fill = am4core.color('#000000');
    chartAndSliderContainer.background.cornerRadius(30, 30, 0, 0);
    chartAndSliderContainer.background.fillOpacity = 0.4;
    chartAndSliderContainer.paddingTop = 12;
    chartAndSliderContainer.paddingBottom = 0;

    // Slider container
    const sliderContainer = chartAndSliderContainer.createChild(am4core.Container);
    sliderContainer.width = am4core.percent(100);
    sliderContainer.padding(0, 15, 15, 10);
    sliderContainer.layout = 'horizontal';

    const slider = sliderContainer.createChild(am4core.Slider);
    slider.width = am4core.percent(100);
    slider.valign = 'middle';
    slider.background.opacity = 0.4;
    slider.opacity = 0.7;
    slider.background.fill = am4core.color('#ffffff');
    slider.marginLeft = 20;
    slider.marginRight = 35;
    slider.height = 15;
    slider.start = 1;

    // what to do when slider is dragged
    slider.events.on('rangechanged', (event) => {
      const index = Math.round((covid_world_timeline.length - 1) * slider.start);
      updateMapData(getSlideData(index).list);
      updateTotals(index);
    });
    // stop animation if dragged
    slider.startGrip.events.on('drag', () => {
      stop();
      if (sliderAnimation) {
        sliderAnimation.setProgress(slider.start);
      }
    });

    // play button
    const playButton = sliderContainer.createChild(am4core.PlayButton);
    playButton.valign = 'middle';
    playButton.background.fill = 'black';
    // play button behavior
    playButton.events.on('toggled', (event) => {
      if (event.target.isActive) {
        play();
      } else {
        stop();
      }
    });
    // make slider grip look like play button
    slider.startGrip.background.fill = playButton.background.fill;
    slider.startGrip.background.strokeOpacity = 0;
    slider.startGrip.icon.stroke = am4core.color('#ffffff');
    slider.startGrip.background.states.copyFrom(playButton.background.states);

    // bubble size slider
    let sizeSlider = container.createChild(am4core.Slider);
    sizeSlider.orientation = 'vertical';
    sizeSlider.height = am4core.percent(12);
    sizeSlider.marginLeft = 25;
    sizeSlider.align = 'left';
    sizeSlider.valign = 'top';
    sizeSlider.verticalCenter = 'middle';
    sizeSlider.opacity = 0.7;
    sizeSlider.background.fill = am4core.color('#ffffff');
    sizeSlider.adapter.add('y', (y, target) => container.pixelHeight * (1 - buttonsAndChartContainer.percentHeight / 100) * 0.25);

    sizeSlider.startGrip.background.fill = activeColor;
    sizeSlider.startGrip.background.fillOpacity = 0.8;
    sizeSlider.startGrip.background.strokeOpacity = 0;
    sizeSlider.startGrip.icon.stroke = am4core.color('#ffffff');
    sizeSlider.startGrip.background.states.getKey('hover').properties.fill = activeColor;
    sizeSlider.startGrip.background.states.getKey('down').properties.fill = activeColor;
    sizeSlider.horizontalCenter = 'middle';

    sizeSlider.events.on('rangechanged', () => {
      sizeSlider.startGrip.scale = 0.75 + sizeSlider.start;
      bubbleSeries.heatRules.getIndex(0).max = 30 + sizeSlider.start * 100;
      circle.clones.each((clone) => {
        clone.radius = clone.radius;
      });
    });

    let sizeLabel = container.createChild(am4core.Label);
    sizeLabel.text = 'max bubble size *';
    sizeLabel.fill = am4core.color('#ffffff');
    sizeLabel.rotation = 90;
    sizeLabel.fontSize = '10px';
    sizeLabel.fillOpacity = 0.5;
    sizeLabel.horizontalCenter = 'middle';
    sizeLabel.align = 'left';
    sizeLabel.paddingBottom = 40;
    sizeLabel.tooltip.setBounds({
      x: 0, y: 0, width: 200000, height: 200000,
    });
    sizeLabel.tooltip.label.wrap = true;
    sizeLabel.tooltip.label.maxWidth = 300;
    sizeLabel.tooltipText = 'Some countries have so many cases that bubbles for countries with smaller values often look the same even if there is a significant difference between them. This slider can be used to increase maximum size of a bubble so that when you zoom in to a region with relatively small values you could compare them anyway.';
    sizeLabel.fill = am4core.color('#ffffff');

    sizeLabel.adapter.add('y', (y, target) => container.pixelHeight * (1 - buttonsAndChartContainer.percentHeight / 100) * 0.25);

    // filter slider

    // bubble size slider
    let filterSlider = container.createChild(am4core.Slider);
    filterSlider.orientation = 'vertical';
    filterSlider.height = am4core.percent(28);
    filterSlider.marginLeft = 25;
    filterSlider.align = 'left';
    filterSlider.valign = 'top';
    filterSlider.verticalCenter = 'middle';
    filterSlider.opacity = 0.7;
    filterSlider.background.fill = am4core.color('#ffffff');
    filterSlider.adapter.add('y', (y, target) => container.pixelHeight * (1 - buttonsAndChartContainer.percentHeight / 100) * 0.7);

    filterSlider.startGrip.background.fill = activeColor;
    filterSlider.startGrip.background.fillOpacity = 0.8;
    filterSlider.startGrip.background.strokeOpacity = 0;
    filterSlider.startGrip.icon.stroke = am4core.color('#ffffff');
    filterSlider.startGrip.background.states.getKey('hover').properties.fill = activeColor;
    filterSlider.startGrip.background.states.getKey('down').properties.fill = activeColor;
    filterSlider.horizontalCenter = 'middle';
    filterSlider.start = 1;

    filterSlider.events.on('rangechanged', () => {
      const maxValue = max[currentType] * filterSlider.start + 1;
      if (!isNaN(maxValue) && bubbleSeries.inited) {
        bubbleSeries.heatRules.getIndex(0).maxValue = maxValue;
        circle.clones.each((clone) => {
          if (clone.dataItem.value > maxValue) {
            clone.dataItem.hide();
          } else {
            clone.dataItem.show();
          }
          clone.radius = clone.radius;
        });
      }
    });

    let filterLabel = container.createChild(am4core.Label);
    filterLabel.text = 'filter max values *';
    filterLabel.rotation = 90;
    filterLabel.fontSize = '10px';
    filterLabel.fill = am4core.color('#ffffff');
    filterLabel.fontSize = '0.8em';
    filterLabel.fillOpacity = 0.5;
    filterLabel.horizontalCenter = 'middle';
    filterLabel.align = 'left';
    filterLabel.paddingBottom = 40;
    filterLabel.tooltip.label.wrap = true;
    filterLabel.tooltip.label.maxWidth = 300;
    filterLabel.tooltipText = 'This filter allows to remove countries with many cases from the map so that it would be possible to compare countries with smaller number of cases.';
    filterLabel.fill = am4core.color('#ffffff');

    filterLabel.adapter.add('y', (y, target) => container.pixelHeight * (1 - buttonsAndChartContainer.percentHeight / 100) * 0.7);

    // play behavior
    function play() {
      if (!sliderAnimation) {
        sliderAnimation = slider.animate({ property: 'start', to: 1, from: 0 }, 50000, am4core.ease.linear).pause();
        sliderAnimation.events.on('animationended', () => {
          playButton.isActive = false;
        });
      }

      if (slider.start >= 1) {
        slider.start = 0;
        sliderAnimation.start();
      }
      sliderAnimation.resume();
      playButton.isActive = true;
    }

    // stop behavior
    function stop() {
      if (sliderAnimation) {
        sliderAnimation.pause();
      }
      playButton.isActive = false;
    }

    // BOTTOM CHART
    // https://www.amcharts.com/docs/v4/chart-types/xy-chart/
    const lineChart = chartAndSliderContainer.createChild(am4charts.XYChart);
    lineChart.fontSize = '0.8em';
    lineChart.paddingRight = 30;
    lineChart.paddingLeft = 30;
    lineChart.maskBullets = false;
    lineChart.zoomOutButton.disabled = true;
    lineChart.paddingBottom = 5;
    lineChart.paddingTop = 3;

    // make a copy of data as we will be modifying it
    lineChart.data = JSON.parse(JSON.stringify(covid_total_timeline));

    // date axis
    // https://www.amcharts.com/docs/v4/concepts/axes/date-axis/
    const dateAxis = lineChart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.stroke = am4core.color('#000000');
    dateAxis.renderer.grid.template.strokeOpacity = 0.25;
    dateAxis.max = lastDate.getTime() + am4core.time.getDuration('day', 5);
    dateAxis.tooltip.label.fontSize = '0.8em';
    dateAxis.tooltip.background.fill = activeColor;
    dateAxis.tooltip.background.stroke = activeColor;
    dateAxis.renderer.labels.template.fill = am4core.color('#ffffff');
    /*
    dateAxis.renderer.labels.template.adapter.add("fillOpacity", function(fillOpacity, target){
        return dateAxis.valueToPosition(target.dataItem.value) + 0.1;
    }) */

    // value axis
    // https://www.amcharts.com/docs/v4/concepts/axes/value-axis/
    const valueAxis = lineChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;
    valueAxis.interpolationDuration = 3000;
    valueAxis.renderer.grid.template.stroke = am4core.color('#000000');
    valueAxis.renderer.grid.template.strokeOpacity = 0.25;
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.renderer.maxLabelPosition = 0.98;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.tooltip.disabled = true;
    valueAxis.extraMax = 0.05;
    valueAxis.maxPrecision = 0;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.verticalCenter = 'bottom';
    valueAxis.renderer.labels.template.fill = am4core.color('#ffffff');
    valueAxis.renderer.labels.template.padding(2, 2, 2, 2);
    valueAxis.adapter.add('max', (max, target) => {
      if (max < 5) {
        max = 5;
      }
      return max;
    });

    valueAxis.adapter.add('min', (min, target) => {
      if (!seriesTypeSwitch.isActive) {
        if (min < 0) {
          min = 0;
        }
      }
      return min;
    });

    // cursor
    // https://www.amcharts.com/docs/v4/concepts/chart-cursor/
    lineChart.cursor = new am4charts.XYCursor();
    lineChart.cursor.maxTooltipDistance = 0;
    lineChart.cursor.behavior = 'none'; // set zoomX for a zooming possibility
    lineChart.cursor.lineY.disabled = true;
    lineChart.cursor.lineX.stroke = activeColor;
    lineChart.cursor.xAxis = dateAxis;
    // this prevents cursor to move to the clicked location while map is dragged
    am4core.getInteraction().body.events.off('down', lineChart.cursor.handleCursorDown, lineChart.cursor);
    am4core.getInteraction().body.events.off('up', lineChart.cursor.handleCursorUp, lineChart.cursor);

    // legend
    // https://www.amcharts.com/docs/v4/concepts/legend/
    lineChart.legend = new am4charts.Legend();
    lineChart.legend.parent = lineChart.plotContainer;
    lineChart.legend.labels.template.fill = am4core.color('#ffffff');
    lineChart.legend.markers.template.height = 8;
    lineChart.legend.contentAlign = 'left';
    lineChart.legend.fontSize = '14px';
    lineChart.legend.itemContainers.template.valign = 'middle';
    let legendDown = false;
    lineChart.legend.itemContainers.template.events.on('down', () => {
      legendDown = true;
    });
    lineChart.legend.itemContainers.template.events.on('up', () => {
      setTimeout(() => {
        legendDown = false;
      }, 100);
    });

    let seriesTypeSwitch = lineChart.legend.createChild(am4core.SwitchButton);
    seriesTypeSwitch.leftLabel.text = 'totals';
    seriesTypeSwitch.rightLabel.text = 'day change';
    seriesTypeSwitch.leftLabel.fill = am4core.color('#ffffff');
    seriesTypeSwitch.rightLabel.fill = am4core.color('#ffffff');

    seriesTypeSwitch.events.on('down', () => {
      legendDown = true;
    });
    seriesTypeSwitch.events.on('up', () => {
      setTimeout(() => {
        legendDown = false;
      }, 100);
    });

    seriesTypeSwitch.events.on('toggled', () => {
      if (seriesTypeSwitch.isActive) {
        if (!columnSeries) {
          createColumnSeries();
        }

        for (var key in columnSeries) {
          columnSeries[key].hide(0);
        }

        for (var key in series) {
          series[key].hiddenInLegend = true;
          series[key].hide();
        }

        columnSeries[currentType].show();
      } else {
        for (var key in columnSeries) {
          columnSeries[key].hiddenInLegend = true;
          columnSeries[key].hide();
        }

        for (var key in series) {
          series[key].hiddenInLegend = false;
          series[key].hide();
        }

        series[currentType].show();
      }
    });

    function updateColumnsFill() {
      columnSeries.active.columns.each((column) => {
        if (column.dataItem.values.valueY.previousChange < 0) {
          column.fillOpacity = 0;
          column.strokeOpacity = 0.6;
        } else {
          column.fillOpacity = 0.6;
          column.strokeOpacity = 0;
        }
      });
    }

    // create series
    const activeSeries = addSeries('active', activeColor);
    // active series is visible initially
    activeSeries.tooltip.disabled = true;
    activeSeries.hidden = false;

    const confirmedSeries = addSeries('confirmed', confirmedColor);
    const recoveredSeries = addSeries('recovered', recoveredColor);
    const deathsSeries = addSeries('deaths', deathsColor);

    // let series = { active: activeSeries, confirmed: confirmedSeries, recovered: recoveredSeries, deaths: deathsSeries };
    // add series
    function addSeries(name, color) {
      const series = lineChart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = name;
      series.dataFields.dateX = 'date';
      series.name = capitalizeFirstLetter(name);
      series.strokeOpacity = 0.6;
      series.stroke = color;
      series.fill = color;
      series.maskBullets = false;
      series.minBulletDistance = 10;
      series.hidden = true;
      series.hideTooltipWhileZooming = true;

      // series bullet
      const bullet = series.bullets.push(new am4charts.CircleBullet());

      // only needed to pass it to circle
      const bulletHoverState = bullet.states.create('hover');
      bullet.setStateOnChildren = true;

      bullet.circle.fillOpacity = 1;
      bullet.circle.fill = backgroundColor;
      bullet.circle.radius = 2;

      const circleHoverState = bullet.circle.states.create('hover');
      circleHoverState.properties.fillOpacity = 1;
      circleHoverState.properties.fill = color;
      circleHoverState.properties.scale = 1.4;

      // tooltip setup
      series.tooltip.pointerOrientation = 'down';
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fillOpacity = 0.2;
      series.tooltip.background.fill = am4core.color('#000000');
      series.tooltip.dy = -4;
      series.tooltip.fontSize = '0.8em';
      series.tooltipText = 'Total {name}: {valueY}';

      return series;
    }

    let series = {
      active: activeSeries, confirmed: confirmedSeries, recovered: recoveredSeries, deaths: deathsSeries,
    };

    let columnSeries;

    function createColumnSeries() {
      columnSeries = {};
      columnSeries.active = addColumnSeries('active', activeColor);
      columnSeries.active.events.on('validated', () => {
        updateColumnsFill();
      });

      columnSeries.confirmed = addColumnSeries('confirmed', confirmedColor);
      columnSeries.recovered = addColumnSeries('recovered', recoveredColor);
      columnSeries.deaths = addColumnSeries('deaths', deathsColor);
    }

    // add series
    function addColumnSeries(name, color) {
      const series = lineChart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = name;
      series.dataFields.valueYShow = 'previousChange';
      series.dataFields.dateX = 'date';
      series.name = capitalizeFirstLetter(name);
      series.hidden = true;
      series.stroke = color;
      series.fill = color;
      series.columns.template.fillOpacity = 0.6;
      series.columns.template.strokeOpacity = 0;
      series.hideTooltipWhileZooming = true;
      series.clustered = false;
      series.hiddenInLegend = true;
      series.columns.template.width = am4core.percent(50);

      // tooltip setup
      series.tooltip.pointerOrientation = 'down';
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fillOpacity = 0.2;
      series.tooltip.background.fill = am4core.color('#000000');
      series.tooltip.fontSize = '0.8em';
      series.tooltipText = "{name}: {valueY.previousChange.formatNumber('+#,###|#,###|0')}";

      return series;
    }

    lineChart.plotContainer.events.on('up', () => {
      if (!legendDown) {
        slider.start = lineChart.cursor.xPosition * ((dateAxis.max - dateAxis.min) / (lastDate.getTime() - dateAxis.min));
      }
    });

    // data warning label
    const label = lineChart.plotContainer.createChild(am4core.Label);
    label.text = 'Current day stats may be incomplete until countries submit their data.';
    label.fill = am4core.color('#ffffff');
    label.fontSize = '0.8em';
    label.paddingBottom = 4;
    label.opacity = 0.5;
    label.align = 'right';
    label.horizontalCenter = 'right';
    label.verticalCenter = 'bottom';

    // BUTTONS
    // create buttons
    const activeButton = addButton('active', activeColor);
    const confirmedButton = addButton('confirmed', confirmedColor);
    const recoveredButton = addButton('recovered', recoveredColor);
    const deathsButton = addButton('deaths', deathsColor);

    // activeButton.style.width = '16rem';

    const buttons = {
      active: activeButton, confirmed: confirmedButton, recovered: recoveredButton, deaths: deathsButton,
    };

    // add button
    function addButton(name, color) {
      const button = buttonsContainer.createChild(am4core.Button);
      button.label.valign = 'middle';
      button.label.fill = am4core.color('#ffffff');
      button.label.fontSize = '11px';
      button.background.cornerRadius(30, 30, 30, 30);
      button.background.strokeOpacity = 0.3;
      button.background.fillOpacity = 0;
      button.background.stroke = buttonStrokeColor;
      button.background.padding(2, 3, 2, 3);
      button.states.create('active');
      button.setStateOnChildren = true;

      const activeHoverState = button.background.states.create('hoverActive');
      activeHoverState.properties.fillOpacity = 0;

      const circle = new am4core.Circle();
      circle.radius = 8;
      circle.fillOpacity = 0.3;
      circle.fill = buttonStrokeColor;
      circle.strokeOpacity = 0;
      circle.valign = 'middle';
      circle.marginRight = 5;
      button.icon = circle;

      // save name to dummy data for later use
      button.dummyData = name;

      const circleActiveState = circle.states.create('active');
      circleActiveState.properties.fill = color;
      circleActiveState.properties.fillOpacity = 0.5;

      button.events.on('hit', handleButtonClick);

      return button;
    }

    // handle button clikc
    function handleButtonClick(event) {
      // we saved name to dummy data
      changeDataType(event.target.dummyData);
    }

    // change data type (active/confirmed/recovered/deaths)
    function changeDataType(name) {
      currentType = name;
      currentTypeName = name;
      if (name != 'deaths') {
        currentTypeName += ' cases';
      }

      bubbleSeries.mapImages.template.tooltipText = `[bold]{name}: {value}[/] [font-size:10px]\n${currentTypeName}`;

      // make button active
      const activeButton = buttons[name];
      activeButton.isActive = true;
      // make other buttons inactive
      for (var key in buttons) {
        if (buttons[key] != activeButton) {
          buttons[key].isActive = false;
        }
      }
      // tell series new field name
      bubbleSeries.dataFields.value = name;
      polygonSeries.dataFields.value = `${name}PC`;

      bubbleSeries.dataItems.each((dataItem) => {
        dataItem.setValue('value', dataItem.dataContext[currentType]);
      });

      polygonSeries.dataItems.each((dataItem) => {
        dataItem.setValue('value', dataItem.dataContext[`${currentType}PC`]);
        dataItem.mapPolygon.defaultState.properties.fill = undefined;
      });

      // change color of bubbles
      // setting colors on mapImage for tooltip colors
      bubbleSeries.mapImages.template.fill = colors[name];
      bubbleSeries.mapImages.template.stroke = colors[name];
      // first child is circle
      bubbleSeries.mapImages.template.children.getIndex(0).fill = colors[name];

      dateAxis.tooltip.background.fill = colors[name];
      dateAxis.tooltip.background.stroke = colors[name];
      lineChart.cursor.lineX.stroke = colors[name];

      // show series
      if (seriesTypeSwitch.isActive) {
        const activeSeries = columnSeries[name];
        activeSeries.show();
        // hide other series
        for (var key in columnSeries) {
          if (columnSeries[key] != activeSeries) {
            columnSeries[key].hide();
          }
        }
      } else {
        const activeSeries = series[name];
        activeSeries.show();
        // hide other series
        for (var key in series) {
          if (series[key] != activeSeries) {
            series[key].hide();
          }
        }
      }

      // update heat rule's maxValue
      bubbleSeries.heatRules.getIndex(0).maxValue = max[currentType];
      polygonSeries.heatRules.getIndex(0).maxValue = maxPC[currentType];
      if (perCapita) {
        polygonSeries.heatRules.getIndex(0).max = colors[name];
        updateCountryTooltip();
      }
    }

    // select a country
    function selectCountry(mapPolygon) {
      resetHover();
      polygonSeries.hideTooltip();

      // if the same country is clicked show world
      if (currentPolygon == mapPolygon) {
        currentPolygon.isActive = false;
        currentPolygon = undefined;
        showWorld();
        return;
      }
      // save current polygon
      currentPolygon = mapPolygon;
      const countryIndex = countryIndexMap[mapPolygon.dataItem.id];
      currentCountry = mapPolygon.dataItem.dataContext.name;

      // make others inactive
      polygonSeries.mapPolygons.each((polygon) => {
        polygon.isActive = false;
      });

      // clear timeout if there is one
      if (countryDataTimeout) {
        clearTimeout(countryDataTimeout);
      }
      // we delay change of data for better performance (so that data is not changed whil zooming)
      countryDataTimeout = setTimeout(() => {
        setCountryData(countryIndex);
      }, 1000); // you can adjust number, 1000 is one second

      updateTotals(currentIndex);
      updateCountryName();

      mapPolygon.isActive = true;
      // meaning it's globe
      if (mapGlobeSwitch.isActive) {
        // animate deltas (results the map to be rotated to the selected country)
        if (mapChart.zoomLevel != 1) {
          mapChart.goHome();
          rotateAndZoom(mapPolygon);
        } else {
          rotateAndZoom(mapPolygon);
        }
      }
      // if it's not a globe, simply zoom to the country
      else {
        mapChart.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
      }
    }

    // change line chart data to the selected countries
    function setCountryData(countryIndex) {
      // instead of setting whole data array, we modify current raw data so that a nice animation would happen
      for (let i = 0; i < lineChart.data.length; i++) {
        const di = covid_world_timeline[i].list;

        const countryData = di[countryIndex];
        const dataContext = lineChart.data[i];
        if (countryData) {
          dataContext.recovered = countryData.recovered;
          dataContext.confirmed = countryData.confirmed;
          dataContext.deaths = countryData.deaths;
          dataContext.active = countryData.confirmed - countryData.recovered - countryData.deaths;
          valueAxis.min = undefined;
          valueAxis.max = undefined;
        } else {
          dataContext.recovered = 0;
          dataContext.confirmed = 0;
          dataContext.deaths = 0;
          dataContext.active = 0;
          valueAxis.min = 0;
          valueAxis.max = 10;
        }
      }

      lineChart.invalidateRawData();
      updateTotals(currentIndex);
      setTimeout(updateSeriesTooltip, 1000);
    }

    function updateSeriesTooltip() {
      let position = dateAxis.dateToPosition(currentDate);
      position = dateAxis.toGlobalPosition(position);
      const x = dateAxis.positionToCoordinate(position);

      lineChart.cursor.triggerMove({ x, y: 0 }, 'soft', true);
      lineChart.series.each((series) => {
        if (!series.isHidden) {
          series.tooltip.disabled = false;
          series.showTooltipAtDataItem(series.tooltipDataItem);
        }
      });
    }

    // what happens when a country is rolled-over
    function rollOverCountry(mapPolygon) {
      resetHover();
      if (mapPolygon) {
        mapPolygon.isHover = true;

        // make bubble hovered too
        const image = bubbleSeries.getImageById(mapPolygon.dataItem.id);
        if (image) {
          image.dataItem.dataContext.name = mapPolygon.dataItem.dataContext.name;
          image.isHover = true;
        }
      }
    }
    // what happens when a country is rolled-out
    function rollOutCountry(mapPolygon) {
      const image = bubbleSeries.getImageById(mapPolygon.dataItem.id);

      resetHover();
      if (image) {
        image.isHover = false;
      }
    }

    // rotate and zoom
    function rotateAndZoom(mapPolygon) {
      polygonSeries.hideTooltip();
      const animation = mapChart.animate([{ property: 'deltaLongitude', to: -mapPolygon.visualLongitude }, { property: 'deltaLatitude', to: -mapPolygon.visualLatitude }], 1000);
      animation.events.on('animationended', () => {
        mapChart.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
      });
    }

    // calculate zoom level (default is too close)
    function getZoomLevel(mapPolygon) {
      const w = mapPolygon.polygon.bbox.width;
      const h = mapPolygon.polygon.bbox.width;
      // change 2 to smaller walue for a more close zoom
      return Math.min(mapChart.seriesWidth / (w * 2), mapChart.seriesHeight / (h * 2));
    }

    // show world data
    function showWorld() {
      currentCountry = 'World';
      currentPolygon = undefined;
      resetHover();

      if (countryDataTimeout) {
        clearTimeout(countryDataTimeout);
      }

      // make all inactive
      polygonSeries.mapPolygons.each((polygon) => {
        polygon.isActive = false;
      });

      updateCountryName();

      // update line chart data (again, modifying instead of setting new data for a nice animation)
      for (let i = 0; i < lineChart.data.length; i++) {
        const di = covid_total_timeline[i];
        const dataContext = lineChart.data[i];

        dataContext.recovered = di.recovered;
        dataContext.confirmed = di.confirmed;
        dataContext.deaths = di.deaths;
        dataContext.active = di.confirmed - di.recovered;
        valueAxis.min = undefined;
        valueAxis.max = undefined;
      }

      lineChart.invalidateRawData();

      updateTotals(currentIndex);
      mapChart.goHome();
    }

    // updates country name and date
    function updateCountryName() {
      countryName.text = `${currentCountry}, ${mapChart.dateFormatter.format(currentDate, 'MMM dd, yyyy')}`;
    }

    // update total values in buttons
    function updateTotals(index) {
      if (!isNaN(index)) {
        const di = covid_total_timeline[index];
        const date = new Date(di.date);
        currentDate = date;

        updateCountryName();

        let position = dateAxis.dateToPosition(date);
        position = dateAxis.toGlobalPosition(position);
        const x = dateAxis.positionToCoordinate(position);

        if (lineChart.cursor) {
          lineChart.cursor.triggerMove({ x, y: 0 }, 'soft', true);
        }
        for (const key in buttons) {
          const count = Number(lineChart.data[index][key]);
          if (!isNaN(count)) {
            buttons[key].label.text = `${capitalizeFirstLetter(key)}: ${numberFormatter.format(count, '#,###')}`;
          }
        }
        currentIndex = index;
      }
    }

    // update map data
    function updateMapData(data) {
      // modifying instead of setting new data for a nice animation
      bubbleSeries.dataItems.each((dataItem) => {
        dataItem.dataContext.confirmed = 0;
        dataItem.dataContext.deaths = 0;
        dataItem.dataContext.recovered = 0;
        dataItem.dataContext.active = 0;
      });

      maxPC = {
        active: 0, confirmed: 0, deaths: 0, recovered: 0,
      };

      for (let i = 0; i < data.length; i++) {
        const di = data[i];
        const image = bubbleSeries.getImageById(di.id);
        const polygon = polygonSeries.getPolygonById(di.id);

        const population = Number(populations[image.dataItem.dataContext.id]);
        if (image) {
          image.dataItem.dataContext.confirmed = di.confirmed;
          image.dataItem.dataContext.deaths = di.deaths;
          image.dataItem.dataContext.recovered = di.recovered;
          image.dataItem.dataContext.active = di.confirmed - di.recovered - di.deaths;
        }

        if (polygon) {
          polygon.dataItem.dataContext.confirmedPC = di.confirmed / population * 1000000;
          polygon.dataItem.dataContext.deathsPC = di.deaths / population * 1000000;
          polygon.dataItem.dataContext.recoveredPC = di.recovered / population * 1000000;
          polygon.dataItem.dataContext.active = di.confirmed - di.recovered - di.deaths;
          polygon.dataItem.dataContext.activePC = polygon.dataItem.dataContext.active / population * 1000000;

          if (population > 100000) {
            if (polygon.dataItem.dataContext.confirmedPC > maxPC.confirmed) {
              maxPC.confirmed = polygon.dataItem.dataContext.confirmedPC;
            }
            if (polygon.dataItem.dataContext.deathsPC > maxPC.deaths) {
              maxPC.deaths = polygon.dataItem.dataContext.deathsPC;
            }
            if (polygon.dataItem.dataContext.recoveredPC > maxPC.recovered) {
              maxPC.recovered = polygon.dataItem.dataContext.recoveredPC;
            }
            if (polygon.dataItem.dataContext.activePC > maxPC.active) {
              maxPC.active = polygon.dataItem.dataContext.activePC;
            }
          }
        }

        bubbleSeries.heatRules.getIndex(0).maxValue = max[currentType];
        polygonSeries.heatRules.getIndex(0).maxValue = maxPC[currentType];

        bubbleSeries.invalidateRawData();
        polygonSeries.invalidateRawData();
      }
    }

    // capitalize first letter
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handleImageOver(event) {
      rollOverCountry(polygonSeries.getPolygonById(event.target.dataItem.id));
    }

    function handleImageOut(event) {
      rollOutCountry(polygonSeries.getPolygonById(event.target.dataItem.id));
    }

    function handleImageHit(event) {
      selectCountry(polygonSeries.getPolygonById(event.target.dataItem.id));
    }

    function handleCountryHit(event) {
      selectCountry(event.target);
    }

    function handleCountryOver(event) {
      rollOverCountry(event.target);
    }

    function handleCountryOut(event) {
      rollOutCountry(event.target);
    }

    function resetHover() {
      polygonSeries.mapPolygons.each((polygon) => {
        polygon.isHover = false;
      });

      bubbleSeries.mapImages.each((image) => {
        image.isHover = false;
      });
    }

    container.events.on('layoutvalidated', () => {
      dateAxis.tooltip.hide();
      lineChart.cursor.hide();
      updateTotals(currentIndex);
    });

    // set initial data and names
    updateCountryName();
    changeDataType('active');
    // populateCountries(slideData.list);

    setTimeout(updateSeriesTooltip, 3000);

    function updateCountryTooltip() {
      polygonSeries.mapPolygons.template.tooltipText = `[bold]{name}: {value.formatNumber('#.')}[/]\n[font-size:10px]${currentTypeName} per 100k`;
    }

    /**
     * Country/state list on the right
     */

    // function populateCountries(list) {
    //   let table = document.querySelector("#areas");
    //   !!table.querySelector(".area").parentNode.removeChild(table);
    //   for (var i = 0; i < list.length; i++) {
    //     let area = list[i];
    //     let tr = document.querySelector("<tr>").classList.add("area").data("areaid", area.id);
    //     table.appendChild(tr);
    //     tr.addEventListener('click', () => {
    //       selectCountry(polygonSeries.getPolygonById($(this).data("areaid")))
    //     });
    //     tr.addEventListener('mouseover', () => {
    //       selectCountry(polygonSeries.getPolygonById($(this).data("areaid")))
    //     });

    //     document.querySelector("<td>").appendTo(tr).data("areaid", area.id).html(area.name);
    //     document.querySelector("<td>").classList.add("value").appendTo(tr).html(area.confirmed);
    //     document.querySelector("<td>").classList.add("value").appendTo(tr).html(area.deaths);
    //     document.querySelector("<td>").classList.add("value").appendTo(tr).html(area.recovered);

    //   }
    //   document.querySelector("#areas").DataTable({
    //     "paging": false,
    //     "select": true
    //   }).column("1")
    //     .order("desc")
    //     .draw();
    // }
    // populateCountries();


    // function idToName(id) {
    //   return am4geodata_data_countries2[id] ? am4geodata_data_countries2[id].country : id == "XX" ? "Others" : id;
    // }

    function removeAntarctica(mapData) {
      for (let i = mapData.length - 1; i >= 0; i--) {
        if (mapData[i].id == 'AQ') {
          mapData.splice(i, 1);
        }
      }
    }
  }
}

export default Map;
