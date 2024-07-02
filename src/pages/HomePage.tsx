import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { StorageContext } from "data/StorageContext";
import { getSelectedVenueLS, setSelectedVenueLS } from "utils/hospitalityVenue";
import NavigationSection from "../components/Navigation/NavigationSection";
import HeaderSection from "components/HeaderSection";

const HomePage = () => {
  const { hospitalityVenues, isScreenLoading, setSelectedVenue } = useContext(StorageContext);

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

  return (
    <div className="bg-background w-full h-screen overflow-auto md:overflow-hidden font-global text-typography">
      <div className="flex h-screen">
        {isScreenLoading && <p>Loading...</p>}
        <NavigationSection />
        <div className="w-full h-screen md:w-9/12 xl:w-10/12 pr-5 pl-5 md:pr-10 md:pl-10">
          <HeaderSection />
          <div className="pt-4 h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
