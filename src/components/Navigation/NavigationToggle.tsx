import { motion } from "framer-motion";
import { useContext } from "react";

import NavigationLink, { tableType } from "./NavigationLink";
import { StorageContext } from "data/StorageContext";
import HospitalityVenueLink from "./HospitalityVenueLink";

export const NavigationToggle = ({ isOpen, toggle }: any) => {
  const { hospitalityVenues } = useContext(StorageContext);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, left: -300, zIndex: 100, position: "absolute", top: 100 }}
        animate={
          isOpen
            ? { opacity: 1, left: 0, transition: { duration: 0.1, delay: 0.2 } }
            : { opacity: 0, left: -300, transition: { duration: 0.1, delay: 0 } }
        }
        className="w-72 overflow-hidden h-50 z-40"
      >
        <div className="border-b border-typography pb-10">
          <NavigationLink tableType={tableType.tables} toggle={toggle} />
          <NavigationLink tableType={tableType.waiters} toggle={toggle} />
          <NavigationLink tableType={tableType.menu} toggle={toggle} />
          <NavigationLink tableType={tableType.messages} toggle={toggle} />
        </div>

        <div className="pt-10">
          <p className="text-center mb-7">Bars&Restaurants</p>
          {hospitalityVenues.map((venue, index) => (
            <HospitalityVenueLink venueId={venue.id} key={index} toggle={toggle} />
          ))}
        </div>
      </motion.div>
    </>
  );
};
