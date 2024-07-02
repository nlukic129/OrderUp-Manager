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
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setSelectedVenue: (venue: IHospitalityVenue) => void;
}

const initialState: IStorageContext = {
  isAuthenticated: false,
  hospitalityVenues: [],
  userData: { email: "", firstName: "", lastName: "", role: "MANAGER" },
  selectedVenue: undefined,
  isLoading: false,
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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const response = await axios.post(
        `${apiAddress}/auth/sign-in`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setIsLoading(false);
      setAuthentication(true);
      setUserData(response.data);
    } catch (e: any) {
      const error = new Error();
      setIsLoading(false);

      if (e.response) {
        error.message = e.response.data.errors[0].msg;
      } else if (e.request) {
        error.message = "Network Error";
      } else {
        error.message = "Error was occurred!";
      }

      throw error;
    }
  };

  const getVenues = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiAddress}/hospitality-venue/all`, {
        withCredentials: true,
      });

      setIsLoading(false);
      setHospitalityVenues(response.data);
    } catch (error) {
      setIsLoading(false);
      console.error("There was an error!", error);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${apiAddress}/auth/sign-out`, {}, { withCredentials: true });
      setAuthentication(false);
      setUserData(initialState.userData);
      setHospitalityVenues([]);
      removeSelectedVenueLS();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("There was an error!", error);
    }
  };

  return (
    <StorageContext.Provider value={{ isAuthenticated, hospitalityVenues, userData, selectedVenue, isLoading, login, logout, setSelectedVenue }}>
      {children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext };
