// record dNA_Sample = {
//   system:system,
//   analysis:dNA_Analysis}

module.exports = class DnaSample {
  constructor(system, dnaAnalysis) {
    this.system = system;
    this.analysis = dnaAnalysis;
  }
}