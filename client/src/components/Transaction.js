import React, { Component } from "react";
import "./Transaction.css";
import Modal from "react-bootstrap/Modal";

export class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tx: this.props.tx,
      show: false
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    hour.toString().length === 1 ? (hour = "0" + hour) : (hour = hour);
    var min = a.getMinutes();
    min.toString().length === 1 ? (min = "0" + min) : (min = min);
    var sec = a.getSeconds();
    sec.toString().length === 1 ? (sec = "0" + sec) : (sec = sec);
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  render() {
    const {
      confirmations,
      script_asm,
      script_hex,
      time,
      txid,
      value
    } = this.state.tx;

    if (this.state.tx) {
      return (
        <tr>
          <td colSpan="2" style={{ width: "150%" }}>
            {txid}
          </td>
          <td style={{ width: "50%" }}>{this.timeConverter(time)}</td>
          <td style={{ width: "50%" }}>{value}</td>
          <td style={{ width: "50%" }}>
            <Modal show={this.state.show} handleClose={this.hideModal}>
              <div className="card">
                <div className="card-body">
                  <h2 className="ui header">
                    <img
                      src="https://cdn.worldvectorlogo.com/logos/litecoin.svg"
                      className="ui circular image"
                    />
                  </h2>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Txid: </strong>
                      {txid}
                    </li>
                    <li className="list-group-item">
                      <strong>Coin: </strong>Litecoin Testnet (LTCTEST, ŁT)
                    </li>
                    <li className="list-group-item">
                      <strong>Confirmations: </strong>
                      {confirmations}
                    </li>
                    <li className="list-group-item list-group-item-success">
                      <strong>Balance: </strong>
                      {value}
                    </li>
                    <li className="list-group-item list-group-item-secondary">
                      <strong>Date: </strong>
                      {this.timeConverter(time)}
                    </li>
                  </ul>
                </div>
              </div>

              <button
                className="btn btn-primary btn-close"
                onClick={this.hideModal}
              >
                Close
              </button>
            </Modal>
            <button
              className="fluid ui blue button"
              type="button"
              onClick={this.showModal}
            >
              open
            </button>
          </td>
        </tr>
      );
    }
  }
}

export default Transaction;
