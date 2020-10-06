"use strict";

function objectToIstf() {}

function IstfToObject() {}

// markers
var RULE_START = 0;
var RULE_END = 1;
var RULE_NAME = 2;
var SELECTOR = 3;
var PARENT_SELECTOR = 4;
var COMPOUND_SELECTOR_START = 5;
var COMPOUND_SELECTOR_END = 6;
var SPACE_COMBINATOR = 5;
var DOUBLED_CHILD_COMBINATOR = 6;
var CHILD_COMBINATOR = 7;
var NEXT_SIBLING_COMBINATOR = 8;
var SUBSEQUENT_SIBLING_COMBINATOR = 9;
var PROPERTY = 10;
var VALUE = 11;
var COMPOUND_VALUE_START = 12;
var COMPOUND_VALUE_END = 13;
var CONDITION = 14;
var FUNCTION_START = 15;
var FUNCTION_END = 16;
var ANIMATION_NAME = 17;
var JS_FUNCTION_SELECTOR = 18;
var JS_FUNCTION_PROPERTY = 19;
var JS_FUNCTION_VALUE = 20;
var JS_FUNCTION_PARTIAL = 21;

// rule types
var STYLE_RULE = 1; // cssom
var CHARSET_RULE = 2;
var IMPORT_RULE = 3; // CSSOM
var MEDIA_RULE = 4; // CSSOM
var FONT_FACE_RULE = 5; // CSSOM
var PAGE_RULE = 6; // CSSOM
var KEYFRAMES_RULE = 7; //css3-animations
var KEYFRAME_RULE = 8; // css3-animations
var MARGIN_RULE = 9; //CSSOM
var NAMESPACE_RULE = 10; // CSSOM
var COUNTER_STYLE_RULE = 11; // css3-lists
var SUPPORTS_RULE = 12; // css3-conditional
var DOCUMENT_RULE = 13; //css3-conditional
var FONT_FEATURE_VALUES_RULE = 14; // css3-fonts
var VIEWPORT_RULE = 15; // css-device-adapt
var REGION_STYLE_RULE = 16; //proposed for css3-regions
var CUSTOM_MEDIA_RULE = 17; // mediaqueries