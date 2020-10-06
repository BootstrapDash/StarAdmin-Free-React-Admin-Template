/**
* @preserve CanvasJS HTML5 & JavaScript Charts - v1.8.0 Beta 2 - http://canvasjs.com/
* CanvasJS Charts follows Dual Licensing Model as mentioned below.
*
* ---------------------Free for Non-Commercial Use--------------------
*
* For non-commercial purposes you can use the software for free under Creative Commons Attribution-NonCommercial 3.0 License. Refer to the following link for further details on the same.
* http://creativecommons.org/licenses/by-nc/3.0/deed.en_US
*
* ---------------------Commercial License--------------------
* Commercial use of CanvasJS requires you to purchase a license. Without a commercial license you can use it for evaluation purposes only. Please refer to the following link for further details.
* http://canvasjs.com/
*
**/
import Charts from '../core/charts';
import CultureInfo from '../core/culture_info';
import {colorSets} from '../constants/themes';
import {cultures} from '../constants/culture';
import {numberFormat, dateFormat} from '../helpers/utils';

export function Chart(containerId, options) {

  const _chart = new Charts(containerId, options, this);

  this.render = () =>  _chart.render(this.options);

  this.options = _chart._options;
};


export const addColorSet = (name, colorSet) => {

    colorSets[name] = colorSet;

};

export const addCultureInfo = (name, cultureInfo) => {

    cultures[name] = cultureInfo;

};

export const formatNumber = (number, formatString, culture) => {

    culture = culture || "en";
    formatString = formatString || "#,##0.##";

    if (!cultures[culture])throw "Unknown Culture Name";
    else numberFormat(number, formatString, new CultureInfo(culture));

};

export const formatDate = (date, formatString, culture) => {

    culture = culture || "en";
    formatString = formatString || "DD MMM YYYY";

    if (!cultures[culture])throw "Unknown Culture Name";
    else dateFormat(date, formatString, new CultureInfo(culture));

};

Chart.version = "v1.8.2";
