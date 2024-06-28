import { createContext, useState, useEffect } from "react";
import axios from "axios";

import { apiAddress } from "config";
import { checkAuth, setAuth } from "utils/auth";
import { IHospitalityVenue } from "../types/venueType";
import { removeSelectedVenue } from "utils/hospitalityVenue";

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
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const initialState: IStorageContext = {
  isAuthenticated: false,
  hospitalityVenues: [],
  userData: { email: "", firstName: "", lastName: "", role: "MANAGER" },
  login: async (email: string, password: string) => {},
  logout: async () => {},
};

const StorageContext = createContext<IStorageContext>(initialState);

const StorageProvider = ({ children }: IStorageProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
  const [userData, setUserData] = useState<IUser>(initialState.userData);
  const [hospitalityVenues, setHospitalityVenues] = useState([]);

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
      removeSelectedVenue();
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return <StorageContext.Provider value={{ isAuthenticated, hospitalityVenues, userData, login, logout }}>{children}</StorageContext.Provider>;
};

export { StorageProvider, StorageContext };
