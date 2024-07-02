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
    text: "Tables",
  },
  menu: {
    icon: menuIcon,
    activeIcon: menuActiveIcon,
    route: "menu",
    text: "Menu",
  },
  waiters: {
    icon: waitersIcon,
    activeIcon: waitersActiveIcon,
    route: "waiters",
    text: "Waiters",
  },
  messages: {
    icon: messagesIcon,
    activeIcon: messagesActiveIcon,
    route: "messages",
    text: "Messages",
  },
};

const NavigationLink = ({ tableType }: INavigationLinkProps) => {
  return (
    <div>
      <NavLink to={tablesConfig[tableType].route}>
        {({ isActive }) => (
          <div className="flex items-center mb-3 h-10">
            {isActive && <img src={activeMarker} alt="active marker" className="h-10 absolute" />}
            <img src={isActive ? tablesConfig[tableType].activeIcon : tablesConfig[tableType].icon} alt="active icon" className="h-5 ml-10" />
            <p className={isActive ? "text-primary ml-6" : "ml-6"}>{tablesConfig[tableType].text}</p>
          </div>
        )}
      </NavLink>
    </div>
  );
};

export default NavigationLink;
