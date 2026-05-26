import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logoutHandler = () => {

    localStorage.removeItem("userInfo");

    navigate("/");
  };

  return (

    <div className="navbar">

      <button
        className="logout-btn"
        onClick={logoutHandler}
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;