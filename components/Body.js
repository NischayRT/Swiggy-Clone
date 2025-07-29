import Restocard from "./RestaurantCard.js";
import { useState, useEffect, use } from "react";
import { Dropdown } from "react-bootstrap";
import Shimmer from "./Shimmer.js";

const DEFAULT_LAT = 17.5170626;
const DEFAULT_LNG = 78.5149691;

const Body = () => {
  const [ResList, setResList] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [locationError, setLocationError] = useState(null);

  // NEW: Get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      fetchData(DEFAULT_LAT, DEFAULT_LNG); // fallback
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setLocationError(null);
        fetchData(userLat, userLng);
      },
      (error) => {
        setLocationError("Location access denied, showing default location.");
        fetchData(DEFAULT_LAT, DEFAULT_LNG);
      }
    );
  };
  useEffect(() => {
    getUserLocation();
  }, []);

  // UPDATED: fetchData now takes lat, lng
  const fetchData = async (lat = DEFAULT_LAT, lng = DEFAULT_LNG) => {
    const apiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
    const data = await fetch(apiUrl);
    const json = await data.json();
    console.log(json);
    setResList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredResList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  if (ResList.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="search-div">
        <input
          placeholder="Search"
          type="search"
          className="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="search-btn"
          onClick={() => {
            console.log(searchText);
            const filteredList = ResList.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredResList(filteredList);
          }}
        >
          Search
        </button>
      </div>
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = ResList.filter(
              (res) => res.info.avgRating > 4.0
            );
            setFilteredResList(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = ResList.filter((res) =>
              res.info.cuisines.includes("Desserts")
            );
            setFilteredResList(filteredList);
          }}
        >
          Desserts
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = ResList.filter(
              (res) => res.info.sla.deliveryTime < 25
            );
            setFilteredResList(filteredList);
          }}
        >
          Quick Delivery
        </button>
      </div>
      <div className="restaurant-cntnr">
        {filteredResList.map((restaurant) => (
          <Restocard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
