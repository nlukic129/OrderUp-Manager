import { createContext, useState, useEffect } from "react";
import axios from "axios";
interface IStorageContext {
  isAuthenticated: boolean;
  restaurants: any[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface IStorageProviderProps {
  children: React.ReactNode;
}

const initialState = {
  isAuthenticated: false,
  restaurants: [],
  login: async (email: string, password: string) => {},
  logout: async () => {},
};

const StorageContext = createContext<IStorageContext>(initialState);

const StorageProvider = ({ children }: IStorageProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      // TODO:Get the restaurants
      // TODO:Set the restaurants state
    }
  }, [isAuthenticated]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://orderup-staticdataapi.onrender.com/auth/sign-in",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response.data);
      // navigate(`/${response.data[0].name}/tables`, { replace: true });
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const logout = async () => {
    // TODO: : Implement logout
  };

  return <StorageContext.Provider value={{ isAuthenticated, restaurants, login, logout }}>{children}</StorageContext.Provider>;
};

export { StorageProvider, StorageContext };
