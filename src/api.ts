import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { template } from 'lodash';

const api = {
  getCountries: '/countries',
  getCountryCases: template('/total/dayone/country/${slug}/status/confirmed'),
};

const useAxios = makeUseAxios({
  axios: axios.create({ baseURL: 'https://api.covid19api.com' })
})

export { useAxios, api };
