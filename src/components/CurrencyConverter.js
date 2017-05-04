import React from 'react';
import { default as _ } from 'lodash';
import { default as fx } from 'money';


const CurrencyConverter = (props) => {
  const {
    base,
    comparison,
    onValueChange,
    value,
    rates
  } = props;

  const data = {};

  fx.base = base;
  fx.rates = rates;

  if (!_.isEmpty(rates)) {
    const converted = fx.convert(value, {
      from: base,
      to: comparison
    });
    data[base] = value;
    data[comparison] = converted;
  }


  return (
    <div id="CurrencyConverter">
      <header className="page-header">
        <h2>Currency Converter</h2>
      </header>
      <h3>Base: { base }</h3>
      <h3>Comparison: { comparison }</h3>
      <input
        type="text"
        className="form-control"
        name="value"
        value={ value }
        onChange={ onValueChange } />
      <pre>{ JSON.stringify(data, null, 2) }</pre>
    </div>
  );
};




export default CurrencyConverter;





