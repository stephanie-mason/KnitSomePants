// ** KNIT SOME PANTS
// ** This is a very serious pants pattern generating algorithm
// ** The website is swank AF and the pants pattern works great
// ** Written by Stephanie Mason

var units = "US"
var unitPrint = "in"
var ease = 0
var pantStyle
var pantFit
var pantWaistStyle
var pantcuffType
var knitDirection

//** DATA COLLECTION **//
function selectType(selection) {
  pantStyle = selection
  if (selection == "regular") {
    document.getElementById("pantsType").innerHTML = " regular pants"
    document.getElementById("measurementDiagram").src = "images/m_regular.png"
    var shortOption = 'inherit'
    var regularOption = 'inherit'
  } else if (selection == "short"){
    document.getElementById("pantsType").innerHTML = " short pants"
    document.getElementById("measurementDiagram").src = "images/m_short.png"
    var shortOption = 'inherit'
    var regularOption = 'none'
  } else {
    document.getElementById("pantsType").innerHTML = " hot pants"
    document.getElementById("measurementDiagram").src = "images/m_hot.png"
    var shortOption = 'none'
    var regularOption = 'none'
  }

  document.getElementsByClassName("shortOption")[0].style.display = shortOption
  document.getElementsByClassName("shortOption")[1].style.display = shortOption
  document.getElementsByClassName("regularOption")[0].style.display = regularOption
  document.getElementsByClassName("regularOption")[1].style.display = regularOption

  highlightButton(selection, "length")
}

function selectFit(selection) {
  pantFit = selection
  if(selection == "tight") {
    ease = -1
    document.getElementById("pantsFit").innerHTML = " tight "
  } else if(selection == "fit") {
    ease = 1
    document.getElementById("pantsFit").innerHTML = " fitted "
  } else {
    ease = 3
    document.getElementById("pantsFit").innerHTML = " baggy "
  }

  highlightButton(selection, "fit")
}

function selectWaist(selection) {
  pantWaistStyle = selection
  if(selection == "rib") {
    document.getElementById("waistType").innerHTML = " ribbed waist band "
  } else {
    document.getElementById("waistType").innerHTML = " with a waist band casing "
  }

  highlightButton(selection, "waist")
}

function selectCuff(selection) {
  pantcuffType = selection
  if(selection == "rib") {
    document.getElementById("cuffType").innerHTML = " ribbed "
  } else {
    document.getElementById("cuffType").innerHTML = " hemmed "
  }

  highlightButton(selection, "cuff")
}

function selectMethod(selection) {
  knitDirection = selection
  if (selection == "td") {
    document.getElementById("pantsMethod").innerHTML = " top down."
  } else if (selection == "bu") {
    document.getElementById("pantsMethod").innerHTML = " bottom up."
  } else {
    var randomNum = Math.random()
    if (randomNum < 0.5) {
      document.getElementById("pantsMethod").innerHTML = " top down."
    } else {
      document.getElementById("pantsMethod").innerHTML = " bottom up."
    }
  }

  highlightButton(selection, "method")
}

//** WEBSITE FUNCTIONALITY **//

function switchUnits() {
  var changes = document.getElementsByClassName("unitPrint")

  if (units == "US") {
    units = "metric"
    ease = toCm(ease)
    unitPrint = "cm"
    var notUnits = "US"
  } else {
    units = "US"
    ease = toInch(ease)
    unitPrint = "in"
    var notUnits = "metric"
  }

  document.getElementById("unitButton").value = "switch to " + notUnits + " units"

  for (i = 0; i < changes.length; i++) {
    changes[i].innerHTML = unitPrint
  }
}

function highlightButton(selection, type) {
  var optionButtons = document.getElementsByClassName(type)

  for (i=0; i < optionButtons.length; i++) {
    if (optionButtons[i].name == selection) {
      optionButtons[i].style.background = "rgba(255, 30, 62, 1)"
    }
    else {
      optionButtons[i].style.background = "rgba(0,0,0,0)"
    }
  }
}

function increment(id, amount) {
  var currValue = document.getElementById(id).innerHTML
  if (currValue > 1 || amount > 0)
    document.getElementById(id).innerHTML = parseInt(currValue) + amount
}

// ** GENERATE PATTERN ** //

function makePants(formInputs) {
    var gaugeWidth = document.getElementById("gaugeWidth").innerHTML
    var gaugeHeight = document.getElementById("gaugeHeight").innerHTML
    var cuffLength = 1
    if (units == "metric") {var cuffLength = toCm(cuffLength)}

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
    pants[key] = addEase(parseFloat(knitter[key]))
  }

  pants.typeOf = pantStyle
  pants.fit = pantFit
  pants.waistStyle = pantWaistStyle
  pants.cuffType = pantcuffType
  pants.direction = knitDirection
  pants.waistSts = convertToSts(pants.waistCirc, pants.stGauge)
  pants.hipSts = convertToSts(pants.hipCirc, pants.stGauge)
  pants.thighSts = convertToSts(pants.thighCirc, pants.stGauge)
  pants.kneeSts = convertToSts(pants.kneeCirc, pants.stGauge)
  pants.ankleSts = convertToSts(pants.ankleCirc, pants.stGauge)
  pants.ankleRows = convertToSts(cuffLength, pants.rowGauge)
  pants.upperInseamRows = convertToSts(pants.upperInseam, pants.rowGauge)
  pants.lowerInseamRows = convertToSts(pants.lowerInseam, pants.rowGauge) - pants.ankleRows
  pants.crotch = calcCrotch(pants)

  console.log(pants)

  printPattern(knitter, pants)
}

function addEase(x) {
  return x + ease
}

function convertToSts(x, gauge) {
  var numSts = Math.round(x * gauge)
  // Even numbers of sts are easier to math
  if (numSts % 2 != 0) {
    numSts ++
  }
  return numSts
}

function calcCrotch(knitter) {
  var crotch = {
    waistRows: 0,
    shapingRows: 0,
    shapingSts: 0
  }
  return crotch
}

function toInch(cm) {
  return cm * 0.3937
}

function toCm(inch) {
  return inch * 2.54
}

function shapingCalc(rows, startSts, endSts) {
  var indecs = Math.abs(endSts - startSts)
  var smaller = rows/indecs

  if (smaller < 1) {
    //additional action -- bo sts
  }

  smaller = Math.floor(smaller)
  larger = smaller + 1;
  numLarger = (rows - (smaller*indecs))
  numSmaller = indecs - numLarger;

  var indec = {
    smaller: smaller,
    larger: larger,
    numSmaller: numSmaller,
    numLarger: numLarger
  }

  return indec
}

function printPattern(knitter, pants) {
  var pantsImage = pants.typeOf + "_" + pants.waistStyle + "_" + pants.direction

  if(knitDirection == "td") {
    var patternOutput = printPatternTD(pants)
  } else {
    var patternOutput = printPatternBU(pants)
  }

  var htmlOutput =
     '<!DOCTYPE html><html><title>👖 Generated Pants Pattern 👖</title>'
   + '<link rel="stylesheet" href="pattern-stylez.css"><body>'
   + '<h1>Tight regular Pants with a Ribbed Waist Band and Hemmed Cuffs</h1>'
   + '<h2>Gauge: </h2>'
   + '<p>'
   + knitter.stGauge + ' sts per ' + unitPrint + ", "
   + knitter.rowGauge + ' rows per ' + unitPrint
   + '<h2>Pattern Notes: </h2>'
   + '<ul>'
   + '<li>You will need an extra set of needles 1 or 2 sizes smaller than those '
   + 'used for the gauge measurement you entered.</li>'
   + '</ul>'
   + '<table>'
    + '<tr>'
      + '<td>'
        + '<img src=schematic/' + pantsImage + '.png>'
      + '</td>'
      + '<td>'
      + patternOutput
      + '</td>'
    + '</tr>'
  + '</table>'
  + '</body>'
  + '</html>'


  console.log(htmlOutput)
  patternWindow = window.open("")
  patternWindow.document.write(htmlOutput)
  patternWindow.document.close()
}

// Top Down Pattern
function printPatternTD(pants) {
  var patternOutput = 'Cast on ' +  pants.waistSts + ' stitches.'

  lowInseamShaping = shapingCalc(pants.lowerInseamRows, pants.ankleSts, pants.kneeSts)
  upperInseamShaping = shapingCalc(pants.upperInseamRows, pants.kneeSts, pants.thighSts)
  console.log(lowInseamShaping)
  console.log(upperInseamShaping)

  patternOutput += '<br><br> Legs: '

  patternOutput += ' Work ' + (lowInseamShaping.numSmaller + lowInseamShaping.numLarger
    + upperInseamShaping.numSmaller + upperInseamShaping.numLarger)
    + ' decreases over the next ' +  (pants.lowerInseamRows + pants.upperInseamRows)
    + ' rows as follows: <br><br>'


  patternOutput += 'Dec1 at marker every '
  patternOutput += upperInseamShaping.smaller + ' rows '
    + upperInseamShaping.numSmaller + 'x'
  if (upperInseamShaping.numLarger > 0 ) {
    patternOutput += ', then every ' + upperInseamShaping.larger + ' rows '
    + upperInseamShaping.numLarger + 'x'
  }

  patternOutput += '<br>(this is where there will be a table break)<br>'

  patternOutput += 'Dec1 at marker every '
  patternOutput += lowInseamShaping.smaller + ' rows '
    + lowInseamShaping.numSmaller + 'x.'
  if (lowInseamShaping.numLarger > 0 ) {
    patternOutput += ', then every ' + lowInseamShaping.larger + ' rows '
    + lowInseamShaping.numLarger + 'x'
  }

  return patternOutput
}

// Bottom Up Pattern
function printPatternBU(pants) {
  var patternOutput = 'Cast on ' +  pants.ankleSts + ' stitches with smaller needles.'

  if(pants.cuffType == 'rib') {
    patternOutput += '. Work ' + (pants.ankleRows*3) + ' rows in twisted k1, p1 rib.'
    pants.lowerInseamRows -= pants.ankleRows*2
  }
  else {
    var hemRows = Math.round(pants.ankleRows)

    patternOutput += ' using any provisional cast on method. Place a marker and '
      + ' join to work in the round. Work ' + hemRows
      + ' rows in St st. Purl next row. Work ' + hemRows + ' more rows in St st.'
      + ' Place CO sts on a spare set of needles and fold behind working sts.'
      + ' k front and back sts together across row to create a folded hem. You'
      + ' will end up with the same number of sts you started with. <br>'
    }


    lowInseamShaping = shapingCalc(pants.lowerInseamRows, pants.ankleSts, pants.kneeSts)
    upperInseamShaping = shapingCalc(pants.upperInseamRows, pants.kneeSts, pants.thighSts)
    console.log(lowInseamShaping)
    console.log(upperInseamShaping)

    patternOutput += ' Work ' + (lowInseamShaping.numSmaller + lowInseamShaping.numLarger
      + upperInseamShaping.numSmaller + upperInseamShaping.numLarger)
      + ' increases over the next ' +  (pants.lowerInseamRows + pants.upperInseamRows)
      + ' rows as follows: <br><br>'

    patternOutput += 'Inc1 at marker every '
    if (lowInseamShaping.numLarger > 0 ) {
      patternOutput += lowInseamShaping.larger + ' rows '
      + lowInseamShaping.numLarger + 'x, then every '
    }
    patternOutput += lowInseamShaping.smaller + ' rows '
      + lowInseamShaping.numSmaller + 'x'

    patternOutput += '<br>(this is where there will be a table break)<br>'

    patternOutput += 'Inc1 at marker every '
    if (upperInseamShaping.numLarger > 0 ) {
      patternOutput += upperInseamShaping.larger + ' rows '
      + upperInseamShaping.numLarger + 'x, then every '
    }
    patternOutput += upperInseamShaping.smaller + ' rows '
      + upperInseamShaping.numSmaller + 'x'


  return patternOutput
}
