import { createContext, useState, useEffect } from "react";
import axios from "axios";

import { apiAddress } from "config";
import { checkAuth, setAuth } from "utils/auth";
import { IHospitalityVenue, ITable, IWaiter } from "../types/venueType";
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
interface IUpdateTableData {
  id: string;
  hospitalityVenueId: string;
  users: string[];
  messages: string[];
  disabledCategories: string[];
}

interface IUpdateWaiterData {
  tables: string[];
  waiterId: string;
}

interface IWaitedData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  tables: string[];
}

interface IUpdateCategoryData {
  id: string;
  name: string;
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
  deleteTable: (tableId: string) => Promise<void>;
  addWaiter: (data: IWaitedData) => Promise<void>;
  deleteWaiter: (waiterId: string) => Promise<void>;
  changeTable: (data: IUpdateTableData) => Promise<void>;
  changeWaiterTables: (data: IUpdateWaiterData) => Promise<void>;
  editCategoryName: (data: IUpdateCategoryData) => Promise<void>;
  deleteArticleCategory: (categoryId: string) => Promise<void>;
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
  deleteTable: async (tableId: string) => {},
  addWaiter: async (data: IWaitedData) => {},
  deleteWaiter: async (waiterId: string) => {},
  changeTable: async (data: IUpdateTableData) => {},
  changeWaiterTables: async (data: IUpdateWaiterData) => {},
  editCategoryName: async (data: IUpdateCategoryData) => {},
  deleteArticleCategory: async (categoryId: string) => {},
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
      console.log(response.data);
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

  const deleteTable = async (tableId: string) => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${apiAddress}/table/${tableId}`, {
        data: { hospitalityVenueId: selectedVenue?.id },
        withCredentials: true,
      });

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            tables: prev.tables.filter((table) => table.id !== tableId),
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

  const addWaiter = async ({ email, firstName, lastName, password, tables }: IWaitedData) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${apiAddress}/auth/signup`,
        { email, firstName, lastName, password, role: "WAITER", hospitalityVenues: [selectedVenue!.id], tables },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const newWaiter = response.data.data;

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            users: [...prev.users, newWaiter],
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

  const deleteWaiter = async (waiterId: string) => {
    try {
      setIsScreenLoading(true);
      await axios.delete(`${apiAddress}/user/${waiterId}`, {
        data: { hospitalityVenueId: selectedVenue?.id },
        withCredentials: true,
      });

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            users: prev.users.filter((user) => user.id !== waiterId),
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

  const changeTable = async ({ id, hospitalityVenueId, users, messages, disabledCategories }: IUpdateTableData) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${apiAddress}/table/${id}`,
        { hospitalityVenueId, users, messages, disabledCategories },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const updatedTable: ITable = response.data.data;

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            tables: prev.tables.map((table) => (table.id === id ? updatedTable : table)),
            users: prev.users.map((user) => {
              if (users.includes(user.id)) {
                const currUserTables = user.tables.map((table) => table.id);
                if (!currUserTables.includes(id)) {
                  user.tables.push({ id });
                }
              } else {
                user.tables = user.tables.filter((table) => table.id !== id);
              }
              return user;
            }),
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

  const changeWaiterTables = async ({ tables, waiterId }: IUpdateWaiterData) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${apiAddress}/user/connect-table`,
        { tables, hospitalityVenueId: selectedVenue!.id, userId: waiterId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const updatedWaiter: IWaiter = response.data.data;

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            users: prev.users.map((user) => (user.id === updatedWaiter.id ? updatedWaiter : user)),
            tables: prev.tables.map((table) => {
              if (tables.includes(table.id)) {
                const currTableWaiters = table.users.map((user) => user.id);
                if (!currTableWaiters.includes(waiterId)) {
                  table.users.push({ id: waiterId });
                }
              } else {
                table.users = table.users.filter((user) => user.id !== waiterId);
              }
              return table;
            }),
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

  const editCategoryName = async ({ id, name }: IUpdateCategoryData) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${apiAddress}/article-category/update/${id}`,
        { name, hospitalityVenueId: selectedVenue!.id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const updatedCategory = response.data.data;

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            categories: prev.categories.map((category) => (category.id === id ? updatedCategory : category)),
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

  const deleteArticleCategory = async (categoryId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`${apiAddress}/article-category/${categoryId}`, {
        data: { hospitalityVenueId: selectedVenue?.id },
        withCredentials: true,
      });

      setSelectedVenue((prev) => {
        if (prev) {
          return {
            ...prev,
            categories: prev.categories.filter((category) => category.id !== categoryId),
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
        deleteTable,
        addWaiter,
        deleteWaiter,
        changeTable,
        changeWaiterTables,
        editCategoryName,
        deleteArticleCategory,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext };
