import React from "react";
import Transactions from "./components/Transactions";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      urls: [
        "https://api.myjson.com/bins/m4w05/",
        "https://api.myjson.com/bins/aaeop/"
      ],
      addressCount: 2,
      loading: false
    };

    this.dateFilter = this.dateFilter.bind(this);
    this.addAddress = this.addAddress.bind(this);
    this.fetchTxs = this.fetchTxs.bind(this);
  }

  componentWillMount() {
    this.fetchTxs();
  }

  componentDidUpdate() {
    // this.fetchTxs();
  }

  fetchTxs() {
    const urls = this.state.urls;
    // console.log(urls);

    const allRequests = urls.map(url =>
      fetch(url).then(response => response.json())
    );

    var allTxs = [];
    Promise.all(allRequests).then(data => {
      data.map(wallet => {
        allTxs = allTxs.concat(wallet.data.txs);
      });
      this.setState({
        shownTxs: allTxs,
        txs: allTxs,
        loading: true
      });
      // console.log(allTxs);
    });
  }

  // componentWillMount() {
  //   this.renderMyData();
  // }

  // renderMyData() {
  //   fetch("https://api.myjson.com/bins/m4w05/")
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       this.setState({ txs: responseJson.data.txs });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  dateFilter(time) {
    var result = this.state.txs.filter(d => {
      var now = Math.round(new Date().getTime() / 1000);
      var range = now - time;
      return d.time > range;
    });
    this.setState({ shownTxs: result });
  }

  addAddress() {
    const urls = [
      "http://localhost:3001/wallets/wallet1",
      "http://localhost:3001/wallets/wallet2",
      "http://localhost:3001/wallets/wallet3",
      "http://localhost:3001/wallets/wallet4",
      "http://localhost:3001/wallets/wallet5"
    ];

    const addressIndex = this.state.urls.length;
    const joined = this.state.urls.concat(urls[addressIndex]);

    if (this.state.addressCount <= 5) {
      this.setState({
        urls: joined,
        addressCount: addressIndex + 1
      });
      this.fetchTxs();
    }
  }

  render() {
    // console.log(this.state.shownTxs);
    return (
      <div className="ui container ">
        <div className="ui block header">
          <h2 className="ui header">
            Address Details{" "}
            <img
              src="https://cdn.worldvectorlogo.com/logos/litecoin.svg"
              className="ui circular image"
            />
          </h2>
          <p>{this.state.address}</p>
        </div>

        <a onClick={() => this.dateFilter(86400)}>today </a>
        <a onClick={() => this.dateFilter(604800)}>last week </a>
        <a onClick={() => this.dateFilter(2678400)}>last month </a>
        <a onClick={() => this.dateFilter(31536000)}>last year </a>
        <a onClick={() => this.setState({ shownTxs: this.state.txs })}>all</a>

        <button onClick={this.addAddress}>Add New Address</button>

        {this.state.loading ? (
          <Transactions txs={this.state.shownTxs} />
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    );
  }
}

export default App;
