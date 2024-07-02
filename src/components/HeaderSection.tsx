import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useCycle } from "framer-motion";

import { StorageContext } from "data/StorageContext";
import { MenuToggle } from "./Navigation/MenuToggle";
import { NavigationToggle } from "./Navigation/NavigationToggle";

const HeaderSection = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const { selectedVenue, logout } = useContext(StorageContext);
  const navigate = useNavigate();

  const onLogoutHandler = async () => {
    try {
      await logout();
      navigate(`/login`, { replace: true });
    } catch (error) {
      console.log(error);
      // TODO: Handle error
    }
  };

  return (
    <>
      <div className="h-20 flex justify-between items-center">
        <div className="block  md:hidden">
          <div className="w-9 h-16">
            <motion.nav initial={false} animate={isOpen ? "open" : "closed"} custom="100%">
              <motion.div className="navbar" variants={sidebar} />
              <NavigationToggle isOpen={isOpen} toggle={() => toggleOpen()} />
              <MenuToggle toggle={() => toggleOpen()} />
            </motion.nav>
          </div>
        </div>
        <div className="text-xl md:text-2xl font-regular">{selectedVenue?.displayName}</div>
        <div>
          <button className="button-logout" type="button" onClick={onLogoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(21px at 35px 39px)",
    transition: {
      delay: 0,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default HeaderSection;
