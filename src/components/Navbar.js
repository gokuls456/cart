import React from "react";
import { Link } from "react-router-dom";
import { Input, Checkbox, Button } from "semantic-ui-react";

const Navbar = () => {
  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">
          McDonald's
        </Link>
        <label className="navbar-restaurant-details">
          <span>★</span> 4.3 &nbsp; &nbsp;|&nbsp; &nbsp; 35mins &nbsp; &nbsp;
          |&nbsp; &nbsp; ₹400 for two
        </label>
        <div className="navbar-restaurant-details-info">
          <Input className="search-dishes-textbox" placeholder="Search..." />
          <Checkbox className="search-dishes-checkbox" label="Veg Only" />
          {/* //heart */}
          <Button icon className="search-dishes-button" labelPosition="left">
            <i className="heart red icon"></i>
            Favourite
          </Button>
        </div>

        {/* <ul className="right">
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/cart">My cart</Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="material-icons">shopping_cart</i>
            </Link>
          </li>
        </ul> */}
      </div>
    </nav>
  );
};

export default Navbar;
