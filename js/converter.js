class Converter {
  // pass in something like 1, [1/16, 1/8, 3/16, 1/4] to represent 1 tbsp per cup, 2 tbsp/cup, etc
  // pass in something like 125, [8, 16, 24, 32] for weight in grams
  // pass negative factors to decrease
  constructor(baseUnit, factors) {
    this.baseUnit = baseUnit;
    this.scaleFactors = factors;
  }

  scaleOriginalAmount(originalAmount) {
    return [
      this._getScale(originalAmount, 0),
      this._getScale(originalAmount, 1),
      this._getScale(originalAmount, 2),
      this._getScale(originalAmount, 3)
    ]
  }

  _getScale(og, factorIndex) {
    return (og + ((og / this.baseUnit) * this.scaleFactors[factorIndex]));
  }
}

class WeightConverter extends Converter {
  constructor(baseUnit, factors) {
    super(baseUnit, factors);
  }

  _getScale(og, factorIndex) {
    return super._getScale(og, factorIndex).toFixed(2)
  }
}

class VolumeConverter extends Converter {
  constructor(baseUnit, factors) {
    super(baseUnit, factors);
  }

  _getScale(og, factorIndex) {
    return new Fraction(super._getScale(og, factorIndex).toFixed(8)).snap();
  }
}

const FlourVolumeConverter = new VolumeConverter(1, [1/16, 1/8, 3/16, 1/4]);
const FlourWeightConverter = new WeightConverter(125, [8, 16, 24, 32]);

const BakingPowderConverter = new VolumeConverter(1, [-1/8, -1/4, -1/2, -2/3]);
const BakingSodaConverter = new VolumeConverter(1, [-1/8, -1/4, -1/2, -2/3]);

const SugarVolumeConverter = new VolumeConverter(1, [-1/16, -1/8, -3/16, -1/4]);
const SugarWeightConverter = new WeightConverter(200, [-12.5, -25, -37.5, -50]);

const LiquidVolumeConverter = new VolumeConverter(1, [1/16, 1/8, 3/16, 1/4]);
const LiquidWeightConverter = new WeightConverter(242, [15, 30, 45, 60]);
