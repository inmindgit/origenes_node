// record dNA_Sample = {
//   system:system,
//   analysis:dNA_Analysis}

module.exports = class dnaSample {
  constructor(system, dnaAnalysis) {
    this.system = system;
    this.analysis = dnaAnalysis;
  }
}