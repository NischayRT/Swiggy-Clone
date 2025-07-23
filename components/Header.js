// Remove the import and use the public folder for the image
import { useState } from "react";
const Header = () => {
  const [LoginBtn, setLoginBtn] = useState("Login");
  return (
    <div className="header">
      <div className="logo">FOODIEVERY </div>
      <div className="NavItems">
        <ul>
          <li>HOME</li>
          <li>OFFERS</li>
          <li>CART</li>
          <button
            className="Login"
            onClick={() => {
              LoginBtn === "Login"
                ? setLoginBtn("Logout")
                : setLoginBtn("Login");
            }}
          >
            {LoginBtn}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
