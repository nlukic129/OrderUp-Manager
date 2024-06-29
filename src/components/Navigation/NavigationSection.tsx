import { useContext } from "react";

import HospitalityVenueLink from "./HospitalityVenueLink";
import NavigationLink, { tableType } from "./NavigationLink";
import { StorageContext } from "data/StorageContext";

const NavigationSection = () => {
  const { hospitalityVenues } = useContext(StorageContext);

  return (
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
  );
};

export default NavigationSection;
