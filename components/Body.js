import Restocard from './RestaurantCard.js';
import { useState, useEffect, use } from "react";
import { Dropdown } from "react-bootstrap";
import Shimmer from './Shimmer.js';
const Body = () => {
  const [ResList, setResList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.5170626&lng=78.5149691&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    setResList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  if (ResList.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="search">
        <input placeholder="Search" type="search" className="search-box" />
        {/* <button className="search-btn">Search</button> */}
      </div>
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            let filteredList = ResList.filter(
              (res) => res.info.avgRating > 4.0
            );
            setResList(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            let filteredList = ResList.filter((res) =>
              res.info.cuisines.includes("Desserts")
            );
            setResList(filteredList);
          }}
        >
          Desserts
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            let filteredList = ResList.filter(
              (res) => res.info.sla.deliveryTime < 25
            );
            setResList(filteredList);
          }}
        >
          Quick Delivery
        </button>
      </div>
      <div className="restaurant-cntnr">
        {ResList.map((restaurant) => (
          <Restocard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};
export default Body;
