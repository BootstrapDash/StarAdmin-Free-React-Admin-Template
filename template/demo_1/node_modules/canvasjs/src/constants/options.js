
export const isDebugMode = false;

export const isCanvasSupported = !!document.createElement("canvas").getContext;
	//isCanvasSupported = false;

	//Default values for all Chart Elements that can be set by the user. CanvasJSObject.setOptions looks into this while setting the default/user-defined values.
export const defaultOptions = {
		Chart: {
			width: 500,
			height: 400,
			zoomEnabled: false,
			zoomType: "x",
			backgroundColor: "white",
			theme: "theme1",
			animationEnabled: false,
			animationDuration: 1200,
			dataPointMaxWidth: null,

			colorSet: "colorSet1",
			culture: "en",
			creditText: "CanvasJS.com",
			interactivityEnabled: true,
			exportEnabled: false,
			exportFileName: "Chart",

			rangeChanging: null,
			rangeChanged: null
		},

		Title: {
			padding: 0,
			text: null,
			verticalAlign: "top",//top, center, bottom
			horizontalAlign: "center",//left, center, right
			fontSize: 20,//in pixels
			fontFamily: "Calibri",
			fontWeight: "normal", //normal, bold, bolder, lighter,
			fontColor: "black",
			fontStyle: "normal", // normal, italic, oblique

			borderThickness: 0,
			borderColor: "black",
			cornerRadius: 0,
			backgroundColor: null,
			margin: 5,
			wrap: true,
			maxWidth: null,

			dockInsidePlotArea: false
			//toolTipContent: null//string - To be implemented (TBI)
		},

		Subtitle: {
			padding: 0,
			text: null,
			verticalAlign: "top",//top, center, bottom
			horizontalAlign: "center",//left, center, right
			fontSize: 14,//in pixels
			fontFamily: "Calibri",
			fontWeight: "normal", //normal, bold, bolder, lighter,
			fontColor: "black",
			fontStyle: "normal", // normal, italic, oblique

			borderThickness: 0,
			borderColor: "black",
			cornerRadius: 0,
			backgroundColor: null,
			margin: 2,
			wrap: true,
			maxWidth: null,

			dockInsidePlotArea: false
			//toolTipContent: null//string - To be implemented (TBI)
		},

		Legend: {
			name: null,
			verticalAlign: "center",
			horizontalAlign: "right",

			fontSize: 14,//in pixels
			fontFamily: "calibri",
			fontWeight: "normal", //normal, bold, bolder, lighter,
			fontColor: "black",
			fontStyle: "normal", // normal, italic, oblique

			cursor: null,
			itemmouseover: null,
			itemmouseout: null,
			itemmousemove: null,
			itemclick: null,

			dockInsidePlotArea: false,
			reversed: false,

			maxWidth: null,
			maxHeight: null,

			itemMaxWidth: null,
			itemWidth: null,
			itemWrap: true,
			itemTextFormatter: null
		},

		ToolTip: {
			enabled: true,
			shared: false,
			animationEnabled: true,
			content: null,
			contentFormatter: null,

			reversed: false,

			backgroundColor: null,

			borderColor: null,
			borderThickness: 2, //in pixels
			cornerRadius: 5, // in pixels

			fontSize: 14, // in pixels
			fontColor: "#000000",
			fontFamily: "Calibri, Arial, Georgia, serif;",
			fontWeight: "normal", //normal, bold, bolder, lighter,
			fontStyle: "italic"  // normal, italic, oblique
		},

		Axis: {
			minimum: null, //Minimum value to be shown on the Axis
			maximum: null, //Minimum value to be shown on the Axis
			viewportMinimum: null,
			viewportMaximum: null,
			interval: null, // Interval for tick marks and grid lines
			intervalType: null, //number, millisecond, second, minute, hour, day, month, year
			//reversed: false,

			title: null, // string
			titleFontColor: "black",
			titleFontSize: 20,
			titleFontFamily: "arial",
			titleFontWeight: "normal",
			titleFontStyle: "normal",

			labelAngle: 0,
			labelFontFamily: "arial",
			labelFontColor: "black",
			labelFontSize: 12,
			labelFontWeight: "normal",
			labelFontStyle: "normal",
			labelAutoFit: false,
			labelWrap: true,
			labelMaxWidth: null,//null for auto
			labelFormatter: null,

			prefix: "",
			suffix: "",

			includeZero: true, //Applies only for axisY. Ignored in axisX.

			tickLength: 5,
			tickColor: "black",
			tickThickness: 1,

			lineColor: "black",
			lineThickness: 1,
			lineDashType: "solid",

			gridColor: "A0A0A0",
			gridThickness: 0,
			gridDashType: "solid",

			interlacedColor: null,

			valueFormatString: null,

			margin: 2,

			stripLines: [] // Just a placeholder. Does not have any effect on the actual number of striplines
		},

		StripLine: {
			value: null,
			startValue: null,
			endValue: null,

			color: "orange",
			opacity: null,
			thickness: 2,
			lineDashType: "solid",
			label: "",
			labelBackgroundColor: "#EEEEEE",
			labelFontFamily: "arial",
			labelFontColor: "orange",
			labelFontSize: 12,
			labelFontWeight: "normal",
			labelFontStyle: "normal",
			labelFormatter: null,

			showOnTop: false
		},

		DataSeries: {
			name: null,
			dataPoints: null,
			label: "",
			bevelEnabled: false,
			highlightEnabled: true,

			cursor: null,

			indexLabel: "",
			indexLabelPlacement: "auto",  //inside, outside, auto
			indexLabelOrientation: "horizontal",
			indexLabelFontColor: "black",
			indexLabelFontSize: 12,
			indexLabelFontStyle: "normal", //   italic ,oblique, normal
			indexLabelFontFamily: "Arial", 	// fx: Arial Verdana "Courier New" Serif
			indexLabelFontWeight: "normal", 	// bold ,bolder, lighter, normal
			indexLabelBackgroundColor: null,
			indexLabelLineColor: null,
			indexLabelLineThickness: 1,
			indexLabelLineDashType: "solid",
			indexLabelMaxWidth: null,
			indexLabelWrap: true,
			indexLabelFormatter: null,

			lineThickness: 2,
			lineDashType: "solid",

			color: null,
			risingColor: "white",
			fillOpacity: null,

			startAngle: 0,

			radius: null,
			innerRadius: null,

			type: "column", //line, column, bar, area, scatter stackedColumn, stackedBar, stackedArea, stackedColumn100, stackedBar100, stackedArea100, pie, doughnut
			xValueType: "number", //number, dateTime
			axisYType: "primary",

			xValueFormatString: null,
			yValueFormatString: null,
			zValueFormatString: null,
			percentFormatString: null,

			showInLegend: null,
			legendMarkerType: null,
			legendMarkerColor: null,
			legendText: null,
			legendMarkerBorderColor: null,
			legendMarkerBorderThickness: null,

			markerType: "circle", //none, circle, square, cross, triangle, line
			markerColor: null,
			markerSize: null,
			markerBorderColor: null,
			markerBorderThickness: null,
			//animationEnabled: true,
			mouseover: null,
			mouseout: null,
			mousemove: null,
			click: null,
			toolTipContent: null,

			visible: true
		},

		//Private
		TextBlock: {
			x: 0,
			y: 0,
			width: null,//read only
			height: null,//read only
			maxWidth: null,
			maxHeight: null,
			padding: 0,
			angle: 0,
			text: "",
			horizontalAlign: "center",//left, center, right
			fontSize: 12,//in pixels
			fontFamily: "calibri",
			fontWeight: "normal", //normal, bold, bolder, lighter,
			fontColor: "black",
			fontStyle: "normal", // normal, italic, oblique

			borderThickness: 0,
			borderColor: "black",
			cornerRadius: 0,
			backgroundColor: null,
			textBaseline: "top"
		},

		CultureInfo: {
			decimalSeparator: ".",
			digitGroupSeparator: ",",
			zoomText: "Zoom",
			panText: "Pan",
			resetText: "Reset",

			menuText: "More Options",
			saveJPGText: "Save as JPG",
			savePNGText: "Save as PNG",

			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		}
	};
