import { useContext, useEffect, useState } from "react";

import activeMarker from "../../assets/images/active-marker.png";
import cafeActive from "../../assets/images/cafe-active.png";
import cafe from "../../assets/images/cafe.png";
import restaurant from "../../assets/images/restaurant.png";
import restaurantActive from "../../assets/images/restaurant-active.png";
import { StorageContext } from "data/StorageContext";
import { HospitalityVenueType, IHospitalityVenue } from "types/venueType";
import { setSelectedVenueLS } from "utils/hospitalityVenue";

interface IHospitalityVenueProps {
  venueId: string;
}

const iconsConfig = {
  [HospitalityVenueType.RESTAURANT]: {
    icon: restaurant,
    activeIcon: restaurantActive,
  },
  [HospitalityVenueType.BAR]: {
    icon: cafe,
    activeIcon: cafeActive,
  },
  [HospitalityVenueType.CAFE]: {
    icon: cafe,
    activeIcon: cafeActive,
  },
  [HospitalityVenueType.PUB]: {
    icon: cafe,
    activeIcon: cafeActive,
  },
  [HospitalityVenueType.CLUB]: {
    icon: cafe,
    activeIcon: cafeActive,
  },
  [HospitalityVenueType.HOTEL]: {
    icon: cafe,
    activeIcon: cafeActive,
  },
  [HospitalityVenueType.HOSTEL]: {
    icon: cafe,
    activeIcon: cafeActive,
  },
  [HospitalityVenueType.MOTEL]: {
    icon: cafe,
    activeIcon: cafeActive,
  },
};

const HospitalityVenueLink = ({ venueId }: IHospitalityVenueProps) => {
  const { hospitalityVenues, selectedVenue, setSelectedVenue } = useContext(StorageContext);
  const [isActive, setIsActive] = useState(false);
  const [venue, setVenue] = useState<IHospitalityVenue>();
  const [icon, setIcon] = useState<string>("");

  useEffect(() => {
    const selectedVenueId = localStorage.getItem("selectedVenue");
    const hospitalityVenue = hospitalityVenues.find((venue) => venue.id === venueId);

    if (hospitalityVenue) {
      setVenue(hospitalityVenue);
      if (hospitalityVenue.id === selectedVenueId) {
        setIsActive(true);
        setIcon(iconsConfig[hospitalityVenue.type].activeIcon);
      } else {
        setIsActive(false);
        setIcon(iconsConfig[hospitalityVenue.type].icon);
      }
    }
  }, [selectedVenue]);

  const selectVenueHandler = () => {
    setSelectedVenue({ ...venue! });
    setSelectedVenueLS(venue!.id);
  };

  return venue ? (
    <div className="flex items-center mb-3 h-10 cursor-pointer" onClick={selectVenueHandler}>
      {isActive && <img src={activeMarker} alt="active marker" className="h-10 absolute" />}
      <img src={icon} alt="active icon" className="h-5 ml-10" />
      <p className={isActive ? "text-primary ml-6" : "ml-6"}>{venue.displayName}</p>
    </div>
  ) : (
    <></>
  );
};

export default HospitalityVenueLink;
