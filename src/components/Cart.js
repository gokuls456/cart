import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removeItem,
  addQuantity,
  subtractQuantity
} from "./actions/cartActions";
import Recipe from "./Recipe";
class Cart extends Component {
  //to remove the item completely
  handleRemove = id => {
    this.props.removeItem(id);
  };
  //to add the quantity
  handleAddQuantity = (id, name, quantity) => {
    this.props.addQuantity(id);
    this.setState({
      [name]: id
    });
  };
  //to substruct from the quantity
  handleSubtractQuantity = id => {
    this.props.subtractQuantity(id);
  };
  render() {
    let addedItems = this.props.items.length ? (
      this.props.items.map(item => {
        return (
          <li className="collection-item avatar" key={item.id}>
            <div className="item-img">
              <img src={item.img} alt={item.item_name} className="" />
            </div>

            <div className="item-desc">
              <span className="title">{item.item_name}</span>
              <p>{item.desc}</p>
              <p>
                <b>₹{item.price}</b>
              </p>
              <p>
                <b>Quantity: {item.quantity}</b>
              </p>
              {/* <div className="add-remove">
                                            <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleAddQuantity(item.id)}}>arrow_drop_up</i></Link>
                                            <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id)}}>arrow_drop_down</i></Link>
                                        </div> */}

              <div className="cart-detail-left">
                <div className="cart-detail-left-border cart-page-details">
                  <i
                    onClick={() => {
                      this.handleSubtractQuantity(item.id);
                    }}
                    className="material-icons cart-icon-quantity"
                  >
                    remove
                  </i>
                  &nbsp;&nbsp;&nbsp;
                  <i
                    onClick={() =>
                      this.handleAddQuantity(
                        item.id,
                        item.item_name,
                        item.quantity
                      )
                    }
                    className="material-icons cart-icon-quantity "
                  >
                    add
                  </i>
                </div>
              </div>
              {/* <button className="waves-effect waves-light btn pink remove" onClick={()=>{this.handleRemove(item.id)}}>Remove</button> */}
            </div>
          </li>
        );
      })
    ) : (
      <p>Don’t wait to lose Weight , go and eat first !!</p>
    );
    return (
      <div className="container cart-container ">
        <div className="cart">
          <span className="clear-cart-button-span">
            <h5>You have ordered:</h5>
            <button
              disabled={!this.props.items.length}
              onClick={() => this.props.removeCart()}
              className="waves-effect clear-cart-button waves-light btn"
            >
              CLEAR CART
            </button>
          </span>
          <ul className="collection">{addedItems}</ul>
        </div>
        <Recipe />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.addedItems
    //addedItems: state.addedItems
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeItem: id => {
      dispatch(removeItem(id));
    },
    addQuantity: id => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    },
    removeCart: () => {
      dispatch({ type: "REMOVE_CART" });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
