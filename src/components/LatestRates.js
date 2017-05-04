import React from 'react';


const LatestRates = (props) => {
  const {
    base,
    date,
    rates
  } = props;

  return (
    <div id="LatestRates">
      <header className="page-header">
        <h2>Latest Rates</h2>
      </header>
      <h3>Base: { base }</h3>
      <h4>Date: { date }</h4>
      <pre>{ JSON.stringify(rates, null, 2) }</pre>
    </div>
  );
};




export default LatestRates;





