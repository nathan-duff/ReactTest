import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

class StockName extends React.Component {
  render() {
    const name = this.props.name;
    return (
      <tr>
        <th colSpan="2">{name}</th>
      </tr>
    );
  }
}


class StockValue extends React.Component {
  render(){
    const stockInfo = this.props.info;
    return(
      <tr>
        <td>{stockInfo.infoType}</td>
        <td>{stockInfo.infoValue}</td>
      </tr>
    );
  }
}

class StockTable extends React.Component {
  render(){
    const filterText = this.props.filterText;
    const rows = [];
    let lastStock = null;

    this.props.stocks.forEach((stock) => {
      if(stock.name.indexOf(filterText) !== -1) {
      if (stock.name !== lastStock){
      rows.push(
        <StockName name={stock.name}/>
      );
      }
      rows.push(
        <StockValue info={stock}/>
      );
      }
    lastStock = stock.name;
    });
    return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
}


class StockSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
   
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    const filterText = this.props.filterText
    return (
      <form>
        <input type="text" placeholder="Search..." value={filterText} onChange={this.handleFilterTextChange}/>
      </form>
    );
  }
}

class WidgetMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText.toUpperCase()
    });
  }

  render() {
    return (
      <div>
        <StockSearch filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange}/>
        <StockTable stocks={this.props.stocks} filterText={this.state.filterText} />
      </div>
    );
  }
}

const STOCKS = [
{name: 'AAPL', infoType: 'High', infoValue: '$100'},
{name: 'AAPL', infoType: 'Low', infoValue: '$50'},
{name: 'TWTR', infoType: 'High', infoValue: '$50'},
{name: 'TWTR', infoType: 'Low', infoValue: '$30'},
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WidgetMenu stocks={STOCKS} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
