import 'whatwg-fetch';


const SYMBOLS = [
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "RUB",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR"
];


function _get(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        const message = [
          response.status,
          response.statusText
        ].join(' ');
        throw new Error(message);
      }

      return response.json()
    });
}


const API_ENDPOINT = 'http://api.fixer.io/';


const Currency = { SYMBOLS };


Currency.latest = (base) => {
  base = base || 'EUR';
  const url = `${ API_ENDPOINT }latest?base=${ base }`;
  return _get(url);
};


Currency.historical = (date, base) => {
  date = date || new Date()
    .toISOString()
    .slice(0, 10);
  base = base || 'EUR';

  const url = `${ API_ENDPOINT }${ date }?base=${ base }`;

  return _get(url);
};


export default Currency;










