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
        initial={{ opacity: 0, zIndex: 49, position: "absolute", top: 0, left: 0 }}
        animate={isOpen ? { opacity: 1, left: 0, transition: { duration: 0 } } : { opacity: 0, left: -300, transition: { duration: 0.5 } }}
        className="w-full h-full backdrop-blur-sm z-49 overflow-hidden"
        onClick={toggle}
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, left: -300, zIndex: 100, position: "absolute", top: 50 }}
        animate={
          isOpen
            ? { opacity: 1, left: 0, transition: { duration: 0.1, delay: 0.2 } }
            : { opacity: 0, left: -300, transition: { duration: 0.1, delay: 0 } }
        }
        className="w-72 overflow-hidden navBarHeight"
      >
        <p className="text-center mb-10 font-semibold text-2xl mt-5">OrderUp</p>
        <div className="border-b border-typography pb-10">
          <NavigationLink tableType={tableType.tables} toggle={toggle} />
          <NavigationLink tableType={tableType.waiters} toggle={toggle} />
          <NavigationLink tableType={tableType.menu} toggle={toggle} />
          <NavigationLink tableType={tableType.messages} toggle={toggle} />
        </div>
        <div className="pt-10">
          <p className="text-center font-semibold mb-7">Bars&Restaurants</p>
          {hospitalityVenues.map((venue, index) => (
            <HospitalityVenueLink venueId={venue.id} key={index} toggle={toggle} />
          ))}
        </div>
      </motion.div>
    </>
  );
};
