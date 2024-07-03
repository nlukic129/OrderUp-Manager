import { NavLink } from "react-router-dom";

import activeMarker from "../../assets/images/active-marker.png";
import tablesActiveIcon from "../../assets/images/tables-active.png";
import tablesIcon from "../../assets/images/tables.png";
import waitersIcon from "../../assets/images/waiters.png";
import waitersActiveIcon from "../../assets/images/waiters-active.png";
import messagesIcon from "../../assets/images/messages.png";
import messagesActiveIcon from "../../assets/images/messages-active.png";
import menuIcon from "../../assets/images/menu.png";
import menuActiveIcon from "../../assets/images/menu-active.png";

interface INavigationLinkProps {
  tableType: tableType;
  toggle?: () => void;
}

export enum tableType {
  tables = "tables",
  menu = "menu",
  waiters = "waiters",
  messages = "messages",
}

const tablesConfig = {
  tables: {
    icon: tablesIcon,
    activeIcon: tablesActiveIcon,
    route: "tables",
    extraRoutes: ["add-table"],
    text: "Tables",
  },
  menu: {
    icon: menuIcon,
    activeIcon: menuActiveIcon,
    route: "menu",
    extraRoutes: [],
    text: "Menu",
  },
  waiters: {
    icon: waitersIcon,
    activeIcon: waitersActiveIcon,
    route: "waiters",
    extraRoutes: [],
    text: "Waiters",
  },
  messages: {
    icon: messagesIcon,
    activeIcon: messagesActiveIcon,
    route: "messages",
    extraRoutes: [],
    text: "Messages",
  },
};

const NavigationLink = ({ tableType, toggle }: INavigationLinkProps) => {
  const generateClassName = () => {
    return isRouteActive() ? "text-primary ml-6" : "ml-6";
  };

  const getActiveImage = () => {
    return isRouteActive() ? tablesConfig[tableType].activeIcon : tablesConfig[tableType].icon;
  };

  const isRouteActive = () => {
    const mainRoute = tablesConfig[tableType].route;
    const extraRoutes = tablesConfig[tableType].extraRoutes || [];
    const allRoutes = [mainRoute, ...extraRoutes];
    return allRoutes.some((route) => window.location.pathname.includes(route));
  };

  return (
    <div onClick={() => toggle && toggle()}>
      <NavLink to={tablesConfig[tableType].route}>
        {() => (
          <div className="flex items-center mb-3 h-10">
            {isRouteActive() && <img src={activeMarker} alt="active marker" className="h-10 absolute" />}
            <img src={getActiveImage()} alt="active icon" className="h-5 ml-10" />
            <p className={generateClassName()}>{tablesConfig[tableType].text}</p>
          </div>
        )}
      </NavLink>
    </div>
  );
};

export default NavigationLink;
