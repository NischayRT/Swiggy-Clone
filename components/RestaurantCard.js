import { CDN_URL } from '../utils/constant.js';
const Restocard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
    resData?.info;
  return (
    <div className="res-card">
      <img className="image1" src={CDN_URL + cloudinaryImageId} alt="image1" />
      <h3 className="name">{name}</h3>
      <div className="cuisine">
        <h4>{cuisines.join(", ")}</h4>
        <h4 className="rating"> {avgRating}</h4>
      </div>
      <h4 className="Cost">{costForTwo}</h4>
      <h4 className="DelTime">{resData.info.sla.deliveryTime} min</h4>
    </div>
  );
};
export default Restocard;