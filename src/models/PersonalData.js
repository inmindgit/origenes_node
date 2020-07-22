module.exports = class PersonalData {
  constructor(caseNumber, name, lastName, documentID, registryCountry, identityCountry){
    this.case_number = caseNumber,
    this.document_id = documentID,
    this.registry_country = registryCountry,
    this.identity_country = identityCountry,
    this.name = name,
    this.last_name = lastName,
    this.address = 'address',
    this.phone_number = 'phone_number',
    this.email = 'email',
    this.contact = 'contact'
  }
}