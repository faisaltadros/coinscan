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
  }

  componentDidMount() {
    // fetches txs from addresses found in state.urls on first load
    this.addAddress();
  }

  // fetchTxs will fetch multiple addresses at the same time using Promise.all
  fetchTxs() {
    const urls = this.state.urls;

    const allRequests = urls.map(url =>
      fetch(url).then(response => response.json())
    );

    let allTxs = [];
    Promise.all(allRequests)
      .then(data => {
        data.map(wallet => {
          if (wallet.txs) {
            allTxs = allTxs.concat(wallet.txs);
          } else if (wallet.data.txs) {
            allTxs = allTxs.concat(wallet.data.txs);
          }
          return null;
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

  // fetchNewTxs will fetch one single address txs and add to the existing txs in state
  fetchNewTxs() {
    const newUrl = this.state.urls[this.state.urls.length - 1];
    let allTxs = this.state.txs;
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

  // removes all txs from the state so that new txs can be concatenated with the old txs and sorted
  refresh() {
    this.setState({
      loading: false
    });
  }

  // dateFilter takes in a range of time using a unix timestamp and returns which
  // txs where found in that range
  dateFilter(time) {
    const result = this.state.txs.filter(d => {
      const now = Math.round(new Date().getTime() / 1000);
      const range = now - time;
      return d.time > range;
    });
    this.setState({ shownTxs: result });
  }

  // runs when a new address is added and new txs are fetched and added to the txs in state
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
      return null;
    });
    return (
      <div className="ui container ">
        <div className="ui block header">
          <h2 className="ui header">
            <img
              alt="litcoin"
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
