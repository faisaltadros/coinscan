import React, { Component } from "react";
import Transaction from "./Transaction";

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      txs: this.props.txs,
      shownTxs: [],
      count: 0
    };
  }

  componentDidMount() {
    this.sortArray();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.txs !== this.props.txs) {
      this.sortArray();
      this.renderData();
    }
  }

  sortArray() {
    const sortedTxs = this.props.txs.sort((a, b) => {
      return b.time - a.time;
    });

    // console.log(sortedTxs);

    this.setState({
      shownTxs: sortedTxs
    });
  }

  renderData() {
    const sortedTxs = this.props.txs.sort((a, b) => {
      return b.time - a.time;
    });

    const myData = []
      .concat(sortedTxs)
      .sort((a, b) => {
        return b.time - a.time;
      })
      .map((tx, i) => <Transaction key={i} tx={tx} index={i} />);

    return myData;
  }

  render() {
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th colSpan="2" style={{ width: "150%" }}>
              Transaction ID
            </th>
            <th style={{ width: "50%" }}>Time</th>
            <th style={{ width: "50%" }}>Value</th>
            <th style={{ width: "50%" }}>More Info</th>
          </tr>
        </thead>
        <tbody>{this.renderData()}</tbody>
      </table>
    );
  }
}

export default Transactions;
