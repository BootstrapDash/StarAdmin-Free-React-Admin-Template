
import CanvasJSObject from './canvasjs';
import {extend} from '../helpers/utils';
import {cultures} from '../constants/culture';

function CultureInfo(culture) {

  var cultureInfo;

  if (culture && cultures[culture]) cultureInfo = cultures[culture];

  CultureInfo.base.constructor.call(this, "CultureInfo", cultureInfo);

}

extend(CultureInfo, CanvasJSObject);

export default CultureInfo;
