import React from 'react';


const CurrencySelecter = (props) => {
  const symbols = props.symbols;
  const onChange = props.onChange;
  const value = props.value;


  const optionElements = [];
  symbols.forEach((symbol) => {
    const optionElement = (
      <option
        key={ symbol }
        value={ symbol }>
        { symbol }
      </option>
    );
    optionElements.push(optionElement);
  });


  return (
    <div id="CurrencySelecter">
      <h2>Currency Selecter</h2>
      <select className="form-control" name="currency_symbol" onChange={ onChange } value={ value }>
        { optionElements }
      </select>
    </div>
  );
};



export default CurrencySelecter;









