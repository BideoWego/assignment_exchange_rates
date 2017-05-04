import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Currency from './services/currency';
import LatestRates from './components/LatestRates';
import CurrencySelecter from './components/CurrencySelecter';
import HistoricalRates from './components/HistoricalRates';
import CurrencyConverter from './components/CurrencyConverter';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base: 'EUR',
      comparison: 'USD',
      latest: {},
      historical: [],
      conversion: { value: 1.00 }
    };

    this._bindEventHandlers();
  }


  componentDidMount() {
    const base = this.state.base;
    const comparison = this.state.comparison;
    this._refresh({ base, comparison });
  }


  render() {
    return (
      <main className="container">
        <header className="page-header text-center">
          <h1>Currency Exchange Rates</h1>

          <CurrencySelecter
            symbols={ Currency.SYMBOLS }
            onChange={ this._onCurrencySelecterChange }
            value={ this.state.base } />
        </header>

        <div className="row">
          <div className="col">
            <LatestRates
              base={ this.state.latest.base }
              date={ this.state.latest.date }
              rates={ this.state.latest.rates } />
          </div>


          <div className="col">
            <HistoricalRates
              base={ this.state.base }
              comparison={ this.state.comparison }
              date={ this.state.latest.date }
              dates={ this.state.historical }
              onCurrencySelecterChange={ this._onHistoricalComparisonCurrencySelecterChange } />

            <CurrencyConverter
              base={ this.state.base }
              comparison={ this.state.comparison }
              value={ this.state.conversion.value }
              rates={ this.state.latest.rates }
              onValueChange={ this._onCurrencyConverterValueChange } />
          </div>
        </div>


      </main>
    );
  }


  _onCurrencySelecterChange(e) {
    const index = e.target.selectedIndex;
    const symbol = Currency.SYMBOLS[index];

    this._refresh({
      base: symbol,
      comparison: this.state.comparison
    });
  }


  _onHistoricalComparisonCurrencySelecterChange(e) {
    const index = e.target.selectedIndex;
    const symbol = Currency.SYMBOLS[index];

    this._refresh({
      base: this.state.base,
      comparison: symbol
    });
  }


  _onCurrencyConverterValueChange(e) {
    let value = '';

    if (e.target.value !== '') {
      value = +e.target.value;
    }

    this.setState({
      conversion: { value }
    });
  }


  _refresh(options) {
    const {
      base,
      comparison
    } = options;


    // Pass base to this function?
    // Avoid double rendering?
    const promises = [
      Currency.latest(base),
      Currency.historical(base)
    ];

    // Set if we can make this the only
    // set state call on change
    Promise.all(promises)
      .then((results) => {
        this.setState({
          base,
          comparison,
          latest: results[0],
          historical: results[1]
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _bindEventHandlers() {
    const handlerNames = [
      '_onCurrencySelecterChange',
      '_onHistoricalComparisonCurrencySelecterChange',
      '_onCurrencyConverterValueChange'
    ];

    handlerNames.forEach((name) => {
      this[name] = this[name].bind(this);
    });
  }
}


export default App;







