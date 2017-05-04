import React from 'react';
import CurrencySelecter from './CurrencySelecter';
import { default as _ } from 'lodash';
import Currency from './../services/currency';

const HistoricalRates = (props) => {
  const {
    base,
    comparison,
    date,
    dates,
    onCurrencySelecterChange
  } = props;

  const rates = {};
  dates.forEach((entry) => {
    const timestamp = entry.date;
    const rate = entry.rates[comparison];
    rates[timestamp] = rate;
  });

  return (
    <div id="HistoricalRates">
      <header className="page-header">
        <h2>Historical Rates</h2>
      </header>
      <h3>Base: { base }</h3>
      <h4>Date: { date }</h4>
      <CurrencySelecter
        symbols={ Currency.SYMBOLS }
        onChange={ onCurrencySelecterChange }
        value={ comparison } />
      <pre>{ JSON.stringify(rates, null, 2) }</pre>
    </div>
  );
};




export default HistoricalRates;





