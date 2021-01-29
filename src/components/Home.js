import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addToCart,
  removeItem,
  subtractQuantity,
  addQuantity
} from "./actions/cartActions";
import { Link } from "react-router-dom";
import { foodImages } from "./reducers/cartReducer";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      foodData: [],
      loading: true
    };
  }
  handleClick = id => {
    this.props.addToCart(id);
  };
  handleSubtractQuantity = id => {
    this.props.subtractQuantity(id);
  };
  handleAddQuantity = id => {
    this.props.addQuantity(id);
  };
  componentDidMount() {
    this.props.getFoodList();
    fetch("https://run.mocky.io/v3/9d71cb03-a9f9-4d70-bae2-9d3adaa1cfe7")
      .then(res => res.json())
      .then(data => {
        this.setState({ foodData: data, loading: false });
      })
      .catch(console.log);
  }
  render() {
    let itemList = this.state.foodData.slice(0, 10).map((item, i) => {
      return (
        <div className="card" key={item.id}>
          <div className="card-content">
            <i className="material-icons food-icons">restaurant_menu</i>{" "}
            <p>
              <b>{item.item_name}</b>
            </p>
            <p>₹{item.price}</p>
          </div>
          <img
            src={foodImages[i]}
            className="item-image"
            alt={item.item_name}
          />
          <div>{/* <span className="card-title">{item.title}</span> */}</div>
          <span
            to="/"
            className="btn-floating halfway-fab waves-effect waves-light red"
            onClick={() => {
              this.handleClick(item.id);
            }}
          >
            <i className="material-icons">add</i>
          </span>
          {/* <span
            to="/"
            className="btn-floating halfway-fab remove-icon waves-effect waves-light red"
            onClick={() => {
              this.handleSubtractQuantity(item.id);
            }}
          >
            <i className="material-icons">remove</i>
          </span> */}
        </div>
      );
    });

    return (
      <div className="container">
        {/* <h3 className="center">Our items</h3> */}
        <div className="box-with-cart-details">
          <div className="box">
            {this.state.loading ? (
              <img
                alt="loadin-icon"
                className="home-food-list-loading"
                src="https://www.steadymd.com/wp-content/plugins/portfolio-filter-gallery//img/loading-icon.gif"
              ></img>
            ) : (
              itemList
            )}
          </div>
          <div className="cart-details-home">
            <h1>
              <b>Cart</b>
            </h1>
            <p className="muted-text">
              {this.props.addedeItems && this.props.addedeItems.length} ITEMS
            </p>
            <div>
              {this.props.addedeItems &&
                this.props.addedeItems.map(data => (
                  <div key={data.id} className="cart-detail-info-home-page">
                    <div className="cart-detail-right">
                      <i className="material-icons food-icons">
                        restaurant_menu
                      </i>
                      <span>
                        <b>{data.item_name}</b>
                      </span>
                    </div>
                    <div className="cart-detail-left">
                      <div className="cart-detail-left-border">
                        <i
                          onClick={() => {
                            this.handleSubtractQuantity(data.id);
                          }}
                          className="material-icons cart-icon-quantity"
                        >
                          remove
                        </i>
                        {data.quantity}
                        <i
                          onClick={() => this.handleAddQuantity(data.id)}
                          className="material-icons cart-icon-quantity "
                        >
                          add
                        </i>
                      </div>
                    </div>
                  </div>
                ))}
              <h3>
                <b>Total : {this.props.totalBill ? this.props.totalBill : 0}</b>
              </h3>
              <Link to="/cart">
                <button
                  disabled={
                    this.props.addedeItems && this.props.addedeItems.length < 1
                  }
                  className="checkout-button-home-cart waves-effect waves-light btn"
                >
                  Checkout ⮕
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    items: state.items,
    addedeItems: state.addedItems,
    totalBill: state.total,
    foodList: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addToCart: id => {
      dispatch(addToCart(id));
    },
    removeItem: id => {
      dispatch(removeItem(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    },
    addQuantity: id => {
      dispatch(addQuantity(id));
    },
    getFoodList: () => {
      dispatch({ type: "GET_FOOD_LIST" });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
