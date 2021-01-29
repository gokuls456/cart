import React, { Component } from "react";
import { connect } from "react-redux";
//import { addShipping } from './actions/cartActions'
class Recipe extends Component {
  //   componentWillUnmount() {
  //     if (this.refs.shipping.checked) this.props.substractShipping();
  //   }

  handleChecked = e => {
    if (e.target.checked) {
      this.props.addShipping();
    } else {
      this.props.substractShipping();
    }
  };
  tenPercentDis = value => {
    this.setState({
      totalAmount: value >= 100 ? Math.abs(value / 10 - value) : value
    });
    return value >= 100 ? Math.abs(value / 10 - value) : value;
  };
  twentyPercentDis = value => {
    this.setState({
      totalAmount: Math.abs(value / 20 - value)
    });
    return Math.abs(value / 20 - value);
  };
  render() {
    const total = this.props.total;
    return (
      <div className="container summary-detail-box ">
        <label className="summary-lable">
          <b>SUMMARY</b>
        </label>
        <div className="collection">
          {/* <li className="collection-item collection-info-bg">
            <label>
              <span>Shipping(+30)₹</span>
            </label>
          </li> */}
          {/* <li className="collection-item collection-info-bg">
            <b>SUB TOTAL: {this.props.total} ₹</b>
          </li> */}
          <li className="collection-item collection-info-bg">
            <b>ESTIMATED TOTAL: {this.props.total} ₹</b>
          </li>
          <li className="collection-item collection-info-bg">
            <b>
              DISCOUNT AMOUNT :{" "}
              {total <= 499
                ? Math.abs(total / 10 - total)
                : Math.abs((total / 10) * 2 - total)}
              ₹
            </b>
          </li>
          <li className="collection-item collection-info-bg">
            <b>
              SHIPPING CHARGES: <span>30₹</span>{" "}
            </b>
          </li>
          <li className="collection-item collection-info-bg">
            <b>
              TOTAL :
              <span>
                {total <= 499
                  ? Math.abs(total / 10 - total) + 30
                  : Math.abs((total / 10) * 2 - total) + 30}
                ₹
              </span>{" "}
            </b>
          </li>
        </div>
        <div className="checkout">
          <button
            disabled={!this.props.addedItems.length}
            className="waves-effect waves-light btn"
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedItems: state.addedItems,
    total: state.total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addShipping: () => {
      dispatch({ type: "ADD_SHIPPING" });
    },
    substractShipping: () => {
      dispatch({ type: "SUB_SHIPPING" });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
