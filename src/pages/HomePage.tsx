import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { StorageContext } from "data/StorageContext";
import { getSelectedVenueLS, setSelectedVenueLS } from "utils/hospitalityVenue";
import NavigationLink, { tableType } from "components/NavigationLink";
import HospitalityVenueLink from "components/HospitalityVenueLink";

const HomePage = () => {
  const { logout, hospitalityVenues, selectedVenue, setSelectedVenue } = useContext(StorageContext);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedVenueIdLS = getSelectedVenueLS();

    if (selectedVenueIdLS) {
      const selectedVenue = hospitalityVenues.find((venue) => venue.id === selectedVenueIdLS);
      if (selectedVenue) {
        selectedVenue && setSelectedVenue(selectedVenue);
        selectedVenue && setSelectedVenue(hospitalityVenues[0]);
        return;
      }
    }

    if (hospitalityVenues.length > 0) {
      setSelectedVenueLS(hospitalityVenues[0].id);
      setSelectedVenue(hospitalityVenues[0]);
    }
  }, [hospitalityVenues]);

  const onLogoutHandler = async () => {
    await logout();
    navigate(`/login`, { replace: true });
  };
  return (
    <div className="bg-background w-full h-screen overflow-hidden font-global text-typography">
      <div className="flex h-screen">
        <div className="hidden md:block w-3/12 xl:w-2/12 h-screen">
          <div className="h-20 font-semibold text-2xl items-center flex justify-center">OrderUp</div>
          <div className="border-r border-typography h-screen pt-3  ">
            <div className="border-b border-typography pb-10">
              <NavigationLink tableType={tableType.tables} />
              <NavigationLink tableType={tableType.waiters} />
              <NavigationLink tableType={tableType.menu} />
              <NavigationLink tableType={tableType.messages} />
            </div>
            <div className="pt-10">
              <p className="text-center mb-7">Bars&Restaurants</p>
              {hospitalityVenues.map((venue, index) => (
                <HospitalityVenueLink venueId={venue.id} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-9/12 xl:w-10/12 h-screen pr-5 pl-5 md:pr-10 md:pl-10">
          <div className="h-20 flex justify-between items-center">
            <div className="block md:hidden">burger menu</div>
            <div className="text-xl md:text-2xl font-regular">{selectedVenue?.displayName}</div>
            <div>
              <button className="button-logout" type="button" onClick={onLogoutHandler}>
                Logout
              </button>
            </div>
          </div>
          <div className=" h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
