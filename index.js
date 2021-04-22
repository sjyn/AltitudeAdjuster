'use strict';

const volSelector = 'vol-specific';
const weightSelector = 'weight-specific';

let measureType = weightSelector;

function handleMeasureChange() {
  const select = document.getElementById('vw-select');
  measureType = select.value;
  if(measureType == volSelector) {
    hideElements(weightSelector);
    showElements(volSelector);
  } else {
    hideElements(volSelector);
    showElements(weightSelector);
  }
}

function hideElements(selector) {
  const elements = document.getElementsByClassName(selector);
  for(const e of elements) {
    e.style.display = 'none';
  }
}

function showElements(selector) {
  const elements = document.getElementsByClassName(selector);
  for(const e of elements) {
    e.style.display = '';
  }
}

function calcRecipeChanges() {
  calcScales('flour', FlourVolumeConverter, FlourWeightConverter);
  calcScales('bp', BakingPowderConverter, BakingPowderConverter);
  calcScales('bs', BakingSodaConverter, BakingSodaConverter);
  calcScales('sugar', SugarVolumeConverter, SugarWeightConverter);
  calcScales('liquid', LiquidVolumeConverter, LiquidWeightConverter);
}

function calcScales(baseSelector, volConverter, weightConverter) {
  const amnt = _getInputVal(`${baseSelector}-amount`);
  const converter = measureType === weightSelector ? weightConverter : volConverter;
  const scales = converter.scaleOriginalAmount(amnt);

  for(let i = 0; i < scales.length; i++) {
    document.getElementById(`${baseSelector}-${i}`).getElementsByClassName(measureType)[0].textContent = scales[i];
  }
}

function _getInputVal(inputId) {
  return parseFloat(document.getElementById(inputId).value || '0.0');
}

document.addEventListener("DOMContentLoaded", function() {
  hideElements(volSelector);
  showElements(weightSelector);
});