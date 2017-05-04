import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Currency from './services/currency';
import LatestRates from './components/LatestRates';
import CurrencySelecter from './components/CurrencySelecter';
import HistoricalRates from './components/HistoricalRates';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      base: 'EUR',
      latest: {},
      historical: [],
      conversion: {}
    };

    this._onCurrencySelecterChange = this._onCurrencySelecterChange.bind(this);
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
              comparison="USD"
              date={ this.state.latest.date }
              dates={ this.state.historical } />
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







