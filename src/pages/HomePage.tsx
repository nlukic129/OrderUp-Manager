import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { StorageContext } from "data/StorageContext";
import { setSelectedVenue } from "utils/hospitalityVenue";

const HomePage = () => {
  const { logout, hospitalityVenues } = useContext(StorageContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (hospitalityVenues.length > 0) {
      setSelectedVenue(hospitalityVenues[0].id);
    }
  }, [hospitalityVenues]);

  const onLogoutHandler = async () => {
    await logout();
    navigate(`/login`, { replace: true });
  };
  return (
    <div>
      <h1>Home Page</h1>
      {hospitalityVenues.length ? JSON.stringify(hospitalityVenues) : "..."}
      <br />
      <button onClick={onLogoutHandler}>Logout</button>
      <Outlet />
    </div>
  );
};

export default HomePage;
