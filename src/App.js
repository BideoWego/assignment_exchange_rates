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

    this._onCurrencySelecterChange =
      this._onCurrencySelecterChange
        .bind(this);
    this._onHistoricalComparisonCurrencySelecterChange =
      this._onHistoricalComparisonCurrencySelecterChange
        .bind(this);
    this._onCurrencyConverterValueChange =
      this._onCurrencyConverterValueChange
        .bind(this);
  }


  componentDidMount() {
    this._refresh();
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
    this.setState({
      base: symbol
    }, () => this._refresh());
  }


  _onHistoricalComparisonCurrencySelecterChange(e) {
    const index = e.target.selectedIndex;
    const symbol = Currency.SYMBOLS[index];
    this.setState({
      comparison: symbol
    }, () => this._refresh());
  }


  _onCurrencyConverterValueChange(e) {
    if (e.target.value !== '') {
      const value = +e.target.value;
      console.log(e.target);
      this.setState({
        conversion: { value }
      }, () => console.log(this.state));
    } else {
      this.setState({
        conversion: { value: '' }
      });
    }
  }


  _refresh() {
    const promises = [
      Currency.latest(this.state.base),
      Currency.historical(this.state.base)
    ];

    Promise.all(promises)
      .then((results) => {
        this.setState({
          latest: results[0],
          historical: results[1]
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}


export default App;







