import React, { Component } from "react";
import Transaction from "./Transaction";

class Transactions extends Component {
  // gets txs from props, sorts by timestamp and renders it to display
  renderData() {
    const shownTxs = this.props.txs;
    const myData = []
      .concat(shownTxs)
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
