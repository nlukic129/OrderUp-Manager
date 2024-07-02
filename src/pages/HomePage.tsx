import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { StorageContext } from "data/StorageContext";
import { getSelectedVenueLS, setSelectedVenueLS } from "utils/hospitalityVenue";
import NavigationSection from "../components/Navigation/NavigationSection";
import HeaderSection from "components/HeaderSection";

const HomePage = () => {
  const { hospitalityVenues, isLoading, setSelectedVenue } = useContext(StorageContext);

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
    <div className="bg-background w-full h-screen overflow-hidden font-global text-typography">
      {!isLoading ? (
        <div className="flex h-screen">
          <NavigationSection />
          <div className="w-full md:w-9/12 xl:w-10/12 h-screen pr-5 pl-5 md:pr-10 md:pl-10">
            <HeaderSection />
            <div className="h-screen pt-4">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
