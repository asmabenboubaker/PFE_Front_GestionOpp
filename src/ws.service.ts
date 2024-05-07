export class WsService {

  getAllCountry = 'ref-countries';
  getCountCountry = 'ref-countries/count';

  getAllCitybyCountry = 'ref-cities?&refCountryName.equals=';
  getCountCity = 'ref-cities/count?&refCountryName.equals=';
  /* opportunité ==================================*/

  getClient ='clients';
  getdemandes = 'demandes'
  getOpp='opportunites'
  getoffre='offres'
  getFacture='factures'
  getTask='tasks'
  getBc='bon-de-commandes'
}
