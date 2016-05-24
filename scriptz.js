// ** KNIT SOME PANTS
// ** This is a very serious pants pattern generating algorithm
// ** The website is swank AF and the pants pattern works great
// ** Written by Stephanie Mason

var units = "US"
var ease = 0;

//** DATA COLLECTION **//
function selectType(selection) {
  if (selection == "pants") {
    document.getElementById("pantsType").innerHTML = " long pants";
    document.getElementById("measurementDiagram").src = "images/m_long.png";
    document.getElementsByClassName("shortOption")[0].style.display = 'inherit';
    document.getElementsByClassName("shortOption")[1].style.display = 'inherit';
    document.getElementsByClassName("longOption")[0].style.display = 'inherit';
    document.getElementsByClassName("longOption")[1].style.display = 'inherit';
  } else if (selection == "shorts"){
    document.getElementById("pantsType").innerHTML = " shorts";
    document.getElementById("measurementDiagram").src = "images/m_short.png";
    document.getElementsByClassName("shortOption")[0].style.display = 'inherit';
    document.getElementsByClassName("shortOption")[1].style.display = 'inherit';
    document.getElementsByClassName("longOption")[0].style.display = 'none';
    document.getElementsByClassName("longOption")[1].style.display = 'none';
  } else {
    document.getElementById("pantsType").innerHTML = " hot pants";
    document.getElementById("measurementDiagram").src = "images/m_hot.png";
    document.getElementsByClassName("shortOption")[0].style.display = 'none';
    document.getElementsByClassName("shortOption")[1].style.display = 'none';
    document.getElementsByClassName("longOption")[0].style.display = 'none';
    document.getElementsByClassName("longOption")[1].style.display = 'none';
  }

  highlightButton(selection, "length");
}

function selectFit(selection) {
  if(selection == "tight") {
    ease = -1;
    document.getElementById("pantsFit").innerHTML = " tight ";
  } else if(selection == "fit") {
    ease = 1;
    document.getElementById("pantsFit").innerHTML = " fitted ";
  } else {
    ease = 3;
    document.getElementById("pantsFit").innerHTML = " baggy ";
  }

  highlightButton(selection, "fit");
}

function selectWaist(selection) {
  if(selection == "Rib") {
    document.getElementById("waistType").innerHTML = " ribbed waist band ";
  } else {
    document.getElementById("waistType").innerHTML = " with a waist band casing ";
  }

  highlightButton(selection, "waist");
}

function selectCuff(selection) {
  if(selection == "RibCuff") {
    document.getElementById("cuffType").innerHTML = " ribbed ";
  } else {
    document.getElementById("cuffType").innerHTML = " hemmed ";
  }

  highlightButton(selection, "cuff");
}

function selectMethod(selection) {
  if (selection == "topDown") {
    document.getElementById("pantsMethod").innerHTML = " top down.";
  } else if (selection == "bottomUp") {
    document.getElementById("pantsMethod").innerHTML = " bottom up.";
  } else {
    var randomNum = Math.random();
    if (randomNum < 0.5) {
      document.getElementById("pantsMethod").innerHTML = " top down.";
    } else {
      document.getElementById("pantsMethod").innerHTML = " bottom up.";
    }
  }

  highlightButton(selection, "method");
}

//** WEBSITE FUNCTIONALITY **//

function switchUnits() {
  var changes = document.getElementsByClassName("unitPrint");

  if (units == "US") {
    units = "metric";
    ease = toCm(ease);
    var unitPrint = "cm";
    var notUnits = "US";
  } else {
    units = "US";
    ease = toInch(ease);
    var unitPrint = "in";
    var notUnits = "metric";
  }

  document.getElementById("unitButton").value = "switch to " + notUnits + " units";

  for (i = 0; i < changes.length; i++) {
    changes[i].innerHTML = unitPrint;
  }
}

function highlightButton(selection, type) {
  var optionButtons = document.getElementsByClassName(type);

  for (i=0; i < optionButtons.length; i++) {
    if (optionButtons[i].name == selection) {
      optionButtons[i].style.background = "rgba(255, 30, 62, 1)";
    }
    else {
      optionButtons[i].style.background = "rgba(0,0,0,0)";
    }
  }
}

function increment(id, amount) {
  var currValue = document.getElementById(id).innerHTML;
  if (currValue > 1 || amount > 0)
    document.getElementById(id).innerHTML = parseInt(currValue) + amount;
}

// ** GENERATE PATTERN ** //

function makePants(formInputs) {
    var gaugeWidth = document.getElementById("gaugeWidth").innerHTML;
    var gaugeHeight = document.getElementById("gaugeHeight").innerHTML;

  var knitter = {
    stGauge: formInputs.stGauge.value / gaugeWidth,
    rowGauge: formInputs.rowGauge.value / gaugeHeight,
    waistCirc: formInputs.waistCirc.value,
    hipCirc: formInputs.hipCirc.value,
    thighCirc: formInputs.thighCirc.value,
    kneeCirc: formInputs.kneeCirc.value,
    ankleCirc: formInputs.ankleCirc.value,
    crotchLength: formInputs.crotchLength.value,
    upperInseam: formInputs.upperInseam.value,
    lowerInseam: formInputs.lowerInseam.value
  }

  var pants = {}
  for(var key in knitter) {
    pants[key] = addEase(parseFloat(knitter[key]));
    //console.log(pants[key]);
  }

  console.log("pants gauge: " + pants.stGauge);
  pants.waistSts = convertToSts(pants.waistCirc, pants.stGauge);
  pants.hipSts = convertToSts(pants.hipCirc, pants.stGauge);
  pants.thighSts = convertToSts(pants.thighCirc, pants.stGauge);
  pants.kneeSts = convertToSts(pants.kneeCirc, pants.stGauge);
  pants.ankleSts = convertToSts(pants.ankleCirc, pants.stGauge);

  //crotch more complicated, some percentage becomes front
  // remaining becomes back, also need to figure out the vertical height
  // versus rows that get shaped over and all that geometry
  // gonna require an algorithm

  pants.upperInseamRows = convertToSts(pants.upperInseam, pants.rowGauge);
  pants.lowerInseamRows = convertToSts(pants.lowerInseam, pants.rowGauge);

  printPattern(pants);
}

function addEase(x) {
  return x + ease;
}

function convertToSts(x, gauge) {
  return Math.round(x * gauge)
}

function calcCrotch() {

}

function toInch(cm) {
  return cm * 0.3937
}

function toCm(inch) {
  return inch * 2.54
}

//maybe have seperate functions for bottom up or top down
function printPattern(pants) {
  var patternPage = '<!DOCTYPE html><html><title>👖 Generated Pants Pattern 👖</title>'
   + '<link rel="stylesheet" href="pattern-stylez.css"><body>'
   + '<h1>Tight Long Pants with a Ribbed Waist Band and Hemmed Cuffs</h1>'
   + 'Cast on ' +  pants.waistSts + ' stitches.'
   
   + '</body></html>';

  var patternWindow = window.open("");
  patternWindow.document.write(patternPage);
  patternWindow.document.close();
}
