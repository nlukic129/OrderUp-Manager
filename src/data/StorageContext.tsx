import { createContext, useState, useEffect } from "react";
import axios from "axios";

import { apiAddress } from "config";
import { checkAuth, setAuth } from "utils/auth";
import { IHospitalityVenue } from "../types/venueType";
import { removeSelectedVenueLS } from "utils/hospitalityVenue";

interface IStorageProviderProps {
  children: React.ReactNode;
}

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  role: "MANAGER" | "ADMIN";
}

interface IStorageContext {
  isAuthenticated: boolean;
  hospitalityVenues: IHospitalityVenue[];
  userData: IUser;
  selectedVenue?: IHospitalityVenue;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setSelectedVenue: (venue: IHospitalityVenue) => void;
}

const initialState: IStorageContext = {
  isAuthenticated: false,
  hospitalityVenues: [],
  userData: { email: "", firstName: "", lastName: "", role: "MANAGER" },
  selectedVenue: undefined,
  login: async (email: string, password: string) => {},
  logout: async () => {},
  setSelectedVenue: (venue: IHospitalityVenue) => {},
};

const StorageContext = createContext<IStorageContext>(initialState);

const StorageProvider = ({ children }: IStorageProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
  const [userData, setUserData] = useState<IUser>(initialState.userData);
  const [hospitalityVenues, setHospitalityVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState<IHospitalityVenue>();

  useEffect(() => {
    if (isAuthenticated) {
      getVenues();
    }
  }, [isAuthenticated]);

  const setAuthentication = (authentication: boolean) => {
    setIsAuthenticated(authentication);
    setAuth(authentication ? "true" : "false");
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${apiAddress}/auth/sign-in`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAuthentication(true);
      setUserData(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const getVenues = async () => {
    try {
      const response = await axios.get(`${apiAddress}/hospitality-venue/all`, {
        withCredentials: true,
      });

      setHospitalityVenues(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiAddress}/auth/sign-out`, {}, { withCredentials: true });
      setAuthentication(false);
      setUserData(initialState.userData);
      setHospitalityVenues([]);
      removeSelectedVenueLS();
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <StorageContext.Provider value={{ isAuthenticated, hospitalityVenues, userData, selectedVenue, login, logout, setSelectedVenue }}>
      {children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext };
