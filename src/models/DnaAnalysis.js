// record dNA_Analysis = {
//   doneDate:string,
//   case_number:string,
//   snp_result:list(string),
//   str_result:list(sTRIndicator)}

module.exports = class DnaAnalysis {
  constructor(doneDate, caseNumber, snpResult, strResult) {
    this.doneDate = doneDate;
    this.case_number = caseNumber;
    this.snp_result = snpResult;
    this.str_result = strResult;
  }
}