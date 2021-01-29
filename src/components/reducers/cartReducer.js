import Item1 from "../../images/item1.jpg";
import Item2 from "../../images/item2.jpg";
import Item3 from "../../images/item3.jpg";
import Item4 from "../../images/item4.jpg";
import Item5 from "../../images/item5.jpg";
import Item6 from "../../images/item6.jpg";
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING
} from "../actions/action-types/cart-actions";
import axios from "axios";
export const foodImages = [
  "https://static.wixstatic.com/media/2cd43b_de870a7313e1454da9573de5162b4bd5~mv2_d_1750_1209_s_2.png",
  "https://lh3.googleusercontent.com/proxy/rjh-PQoi_JW1Opov2QCZHaEBzdfKB_nR1EPOj2HdUQKylERFDvnyTKJiGvA976n9hxdq7kPnrHodznUG02jMs5QjJcpaXU__-jrqlHlpdDEA",
  "https://assets.stickpng.com/images/580b57fbd9996e24bc43c0cc.png",
  "https://www.clipartmax.com/png/middle/124-1241301_free-indian-food-png-file-with-plate-with-indian-food-indian-food.png",
  "https://www.seekpng.com/png/detail/25-255623_food-restaurant-plate-board-restaurant-food-dinner-plate.png",
  "https://img.favpng.com/5/14/21/chinese-cuisine-indian-cuisine-cambodian-cuisine-restaurant-food-png-favpng-1E6uipXQKX8J47u7EeUt9YzP1.jpg",
  "https://mantrapines.com/wp-content/uploads/2020/10/Website-Image-min-1.png",
  "https://www.freeiconspng.com/uploads/giftcards-food-png-27.png",
  "https://i.dlpng.com/static/png/6957235_preview.png",
  "https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png"
];
const initState = {
  items: [
    {
      id: 1,
      title: "Winter body",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 110,
      img: Item1
    },
    {
      id: 2,
      title: "Adidas",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 80,
      img: Item2
    },
    {
      id: 3,
      title: "Vans",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 120,
      img: Item3
    },
    {
      id: 4,
      title: "White",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 260,
      img: Item4
    },
    {
      id: 5,
      title: "Cropped-sho",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 160,
      img: Item5
    },
    {
      id: 6,
      title: "Blues",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 90,
      img: Item6
    }
  ],
  addedItems: [],
  total: 0,
  foodList: []
};
const cartReducer = (state = initState, action) => {
  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    let addedItem = state.foodList.find(item => item.id === action.id);
    //check if the action id exists in the addedItems
    let existed_item = state.addedItems.find(item => action.id === item.id);

    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price
      };
    } else {
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.price;

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal
      };
    }
  }
  if (action.type === "GET_FOOD_LIST") {
    axios
      .get("https://run.mocky.io/v3/9d71cb03-a9f9-4d70-bae2-9d3adaa1cfe7")
      .then(function(response) {
        // handle success
        state.foodList = response.data.map((data, i) =>
          Object.assign(data, { quantity: 0, img: foodImages[i] })
        );
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find(item => action.id === item.id);
    let new_items = state.addedItems.filter(item => action.id !== item.id);

    //calculating the total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    console.log(itemToRemove);
    return {
      ...state,
      addedItems: new_items,
      total: newTotal
    };
  }
  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.foodList.find(item => item.id === action.id);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.foodList.find(item => item.id === action.id);
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter(item => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal
      };
    }
  }

  if (action.type === ADD_SHIPPING) {
    return {
      ...state,
      total: state.total + 6
    };
  }
  if (action.type === "REMOVE_CART") {
    return (state = initState);
  }
  if (action.type === "SUB_SHIPPING") {
    return {
      ...state,
      total: state.total - 6
    };
  } else {
    return state;
  }
};

export default cartReducer;
