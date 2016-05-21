var units = "US"

function selectType(selection) {
  if (selection == "pants") {
    document.getElementById("pantsType").innerHTML = " long pants";
  } else if (selection == "shorts"){
    document.getElementById("pantsType").innerHTML = " shorts";
  } else {
    document.getElementById("pantsType").innerHTML = " hot pants";
  }

  highlightButton(selection, "length");
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

function selectFit(selection) {
  if(selection == "tight") {
    document.getElementById("pantsFit").innerHTML = " tight ";
  } else if(selection == "fit") {
    document.getElementById("pantsFit").innerHTML = " fitted ";
  } else {
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

function switchUnits() {
  var changes = document.getElementsByClassName("unitPrint");

  if (units == "US") {
    units = "metric";
    var unitPrint = "cm";
  }
  else {
    units = "US";
    var unitPrint = "in";
  }

  document.getElementById("unitButton").value = "switch to " + units + " units";

  for (i = 0; i < changes.length; i++) {
    changes[i].innerHTML = unitPrint;
  }
}

function highlightButton(selection, type) {
  var optionButtons = document.getElementsByClassName(type);

  for (i=0; i < optionButtons.length; i++) {
    if (optionButtons[i].name == selection) {
      optionButtons[i].style.background = "rgba(255, 30, 62, .9)";
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



function makePants(gaugeForm) {
  var stGauge = gaugeForm.stGauge.value;
  var rowGauge = gaugeForm.rowGauge.value;

  var knitter = new Knitter(stGauge, rowGauge);

  document.getElementById("coSts").innerHTML = knitter.stGauge * 6;

}

function Knitter(stGauge, rowGauge) {
  this.stGauge = stGauge;
  this.rowGauge = rowGauge;


}

function Legs() {

}

function Pants() {

}
