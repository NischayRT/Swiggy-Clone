import React from "react";
import ReactDOM from "react-dom/client";
import KFC from "./kfc.png";
const Head = () => {
  return (
    <div className="header">
      <div className="logo">
        <h1>FOODIEVERY</h1>
      </div>
      <div className="NavItems">
        <ul>
          <li>HOME</li>
          <li>OFFERS</li>
          <li>CART</li>
        </ul>
      </div>
    </div>
  );
};
const Restocard = (resName, resCuisine, resRating, delTime) => {
  console.log("Restocard: ", props);
  return (
    <div className="res-card">
      <img className="image1" src={KFC} alt="KFC" />
      <h3>{resName}</h3>
      <h4 className="cuisine">
        {resCuisine}
        <h4 className="rating"> {resRating}</h4>
      </h4>
      <h4>{delTime}</h4>
    </div>
  );
};
const Body = () => {
  console.log("body");
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="resto-cntnr">
        <Restocard
          resName="KFC"
          resCuisine="Burgers, Fast Food "
          resRating="4.3"
          delTime="15 min"
        />
        <Restocard
          resName="Swagath"
          resCuisine="Indian, Biryani "
          resRating="4.1"
          delTime="10 min"
        />
        <Restocard
          resName="Momo's Madness"
          resCuisine="Asian, Continental "
          resRating="4.0"
          delTime="18 min"
        />
        <Restocard
          resName="Santosh Dhaba"
          resCuisine="Vegetarian, Indian "
          resRating="3.9"
          delTime="25 min"
        />
      </div>
    </div>
  );
};
const AppLayout = () => {
  return (
    <div className="app">
      <Head />
      <Body />
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
