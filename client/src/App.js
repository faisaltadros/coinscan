import React from "react";
import Transactions from "./components/Transactions";
import Loader from "./components/Loader";
import DateChange from "./components/DateChange";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      urls: [
        "http://localhost:3001/wallets/mgR4uAAekM6ZSecEV8YA9ZYHQvMdqRWdnP",
        "http://localhost:3001/wallets/mmyd1CeSxxPuQB8JXbrgXucG5pP3M5JHGn"
      ],
      addressCount: 2,
      loading: false,
      shownTxs: [],
      txs: []
    };

    this.dateFilter = this.dateFilter.bind(this);
    this.addAddress = this.addAddress.bind(this);
    // this.fetchTxs = this.fetchTxs.bind(this);
    // this.fetchNewTxs = this.fetchNewTxs.bind(this);
  }

  componentDidMount() {
    this.addAddress();
  }

  fetchTxs() {
    const urls = this.state.urls;

    const allRequests = urls.map(url =>
      fetch(url).then(response => response.json())
    );

    var allTxs = [];
    Promise.all(allRequests)
      .then(data => {
        data.map(wallet => {
          if (wallet.txs) {
            allTxs = allTxs.concat(wallet.txs);
          } else if (wallet.data.txs) {
            allTxs = allTxs.concat(wallet.data.txs);
          }
        });
        this.setState({
          shownTxs: allTxs,
          txs: allTxs,
          loading: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchNewTxs() {
    const newUrl = this.state.urls[this.state.urls.length - 1];
    var allTxs = this.state.txs;
    fetch(newUrl)
      .then(res => res.json())
      .then(wallet => {
        allTxs = allTxs.concat(wallet.data.txs);
        this.setState({
          shownTxs: allTxs,
          txs: allTxs,
          loading: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  refresh() {
    this.setState({
      loading: false
    });
  }

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
      "http://localhost:3001/wallets/mgR4uAAekM6ZSecEV8YA9ZYHQvMdqRWdnP",
      "http://localhost:3001/wallets/mmyd1CeSxxPuQB8JXbrgXucG5pP3M5JHGn",
      "http://localhost:3001/wallets/msNRW6K5g5VagPFCyihmX47zE4fh9NoVn3",
      "http://localhost:3001/wallets/mi4BnbVd1TFVrbpaGbimduQirwWBNwKSny",
      "http://localhost:3001/wallets/mgALHtP9CNDbtbYXRdzjj7Lu5D8xBnZxr8"
    ];

    const addressIndex = this.state.urls.length;
    const oldUrls = this.state.urls;
    const joined = oldUrls.concat(urls[addressIndex]);

    if (this.state.addressCount <= 5) {
      this.refresh();
      this.setState({
        urls: joined,
        addressCount: addressIndex + 1
      });

      if (this.state.addressCount <= 2) {
        this.fetchTxs();
      } else {
        this.fetchNewTxs();
      }
    }
  }

  render() {
    const urls = this.state.urls;

    const renderAddresses = urls.map((url, i) => {
      if (url && i !== urls.length && i !== urls.length - 1) {
        return <li key={i}>{url.substring(url.lastIndexOf("/") + 1)}</li>;
      }
    });
    return (
      <div className="ui container ">
        <div className="ui block header">
          <h2 className="ui header">
            <img
              src="https://cdn.worldvectorlogo.com/logos/litecoin.svg"
              className="ui circular image"
            />{" "}
            Wallet Addresses:
          </h2>
          <ul>{renderAddresses}</ul>
        </div>
        <DateChange parentMethod={this.dateFilter} />
        <button onClick={this.addAddress} className="fluid ui button">
          Add New Address
        </button>
        {this.state.loading ? (
          <Transactions txs={this.state.shownTxs} />
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default App;
