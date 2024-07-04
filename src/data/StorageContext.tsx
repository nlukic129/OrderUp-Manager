import { createContext, useState, useEffect } from "react";
import axios from "axios";

import { apiAddress } from "config";
import { checkAuth, setAuth } from "utils/auth";
import { IHospitalityVenue, ITable } from "../types/venueType";
import { removeSelectedVenueLS } from "utils/hospitalityVenue";
import { createError } from "utils/createError";

interface IStorageProviderProps {
  children: React.ReactNode;
}

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  role: "MANAGER" | "ADMIN";
}

interface ITableData {
  name: string;
  hospitalityVenueId: string;
  users: string[];
  messages: string[];
  disabledCategories: string[];
}

interface IStorageContext {
  isAuthenticated: boolean;
  hospitalityVenues: IHospitalityVenue[];
  userData: IUser;
  selectedVenue?: IHospitalityVenue;
  isLoading: boolean;
  isScreenLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addMessage: (messageText: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  setSelectedVenue: (venue: IHospitalityVenue) => void;
  addTable: (data: ITableData) => Promise<void>;
}

const initialState: IStorageContext = {
  isAuthenticated: false,
  hospitalityVenues: [],
  userData: { email: "", firstName: "", lastName: "", role: "MANAGER" },
  selectedVenue: undefined,
  isLoading: false,
  isScreenLoading: false,
  login: async (email: string, password: string) => {},
  logout: async () => {},
  addMessage: async (messageText: string) => {},
  deleteMessage: async (messageId: string) => {},
  setSelectedVenue: (venue: IHospitalityVenue) => {},
  addTable: async (data: ITableData) => {},
};

const StorageContext = createContext<IStorageContext>(initialState);

const StorageProvider = ({ children }: IStorageProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
  const [userData, setUserData] = useState<IUser>(initialState.userData);
  const [hospitalityVenues, setHospitalityVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState<IHospitalityVenue>();
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

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
    } catch (error) {
      setIsLoading(false);
      throw createError(error);
    }
  };

  const getVenues = async () => {
    try {
      setIsScreenLoading(true);
      const response = await axios.get(`${apiAddress}/hospitality-venue/all`, {
        withCredentials: true,
      });

      setIsScreenLoading(false);
      setHospitalityVenues(response.data);
    } catch (error) {
      setIsScreenLoading(false);
      const e = createError(error);
      if (e.message === "User is logged out.") {
        setAuthentication(false);
        setUserData(initialState.userData);
        setHospitalityVenues([]);
        removeSelectedVenueLS();
        return window.location.reload();
      }
      console.log(e.message);
    }
  };

  const logout = async () => {
    try {
      setIsScreenLoading(true);
      await axios.post(`${apiAddress}/auth/sign-out`, {}, { withCredentials: true });
      setAuthentication(false);
      setUserData(initialState.userData);
      setHospitalityVenues([]);
      removeSelectedVenueLS();
      setIsScreenLoading(false);
    } catch (error) {
      setIsScreenLoading(false);
      throw createError(error);
    }
  };

  const addMessage = async (messageText: string) => {
    try {
      const tables = selectedVenue!.tables.map((table) => table.id);
      setIsLoading(true);
      const response = await axios.post(
        `${apiAddress}/messages/add`,
        { message: messageText, hospitalityVenueId: selectedVenue?.id, tables, isPriority: false },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const newMessage = response.data.data;

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            messages: [...prev.messages, { message: newMessage.message, id: newMessage.id }],
          };
        }
        return prev;
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw createError(error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      setIsScreenLoading(true);
      await axios.delete(`${apiAddress}/messages/${messageId}`, {
        data: { hospitalityVenueId: selectedVenue?.id },
        withCredentials: true,
      });
      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            messages: prev.messages.filter((message) => message.id !== messageId),
          };
        }
        return prev;
      });
      setIsScreenLoading(false);
    } catch (error) {
      setIsScreenLoading(false);
      throw createError(error);
    }
  };

  const addTable = async ({ name, hospitalityVenueId, users, messages, disabledCategories }: ITableData) => {
    try {
      setIsScreenLoading(true);
      const response = await axios.post(
        `${apiAddress}/table/add`,
        {
          name,
          hospitalityVenueId,
          users,
          messages,
          disabledCategories,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const newTable: ITable = response.data.data;

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            tables: [...prev.tables, newTable],
          };
        }
        return prev;
      });

      setIsScreenLoading(false);
    } catch (error) {
      setIsScreenLoading(false);
      throw createError(error);
    }
  };

  return (
    <StorageContext.Provider
      value={{
        isAuthenticated,
        hospitalityVenues,
        userData,
        selectedVenue,
        isLoading,
        isScreenLoading,
        login,
        logout,
        setSelectedVenue,
        addMessage,
        deleteMessage,
        addTable,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext };
