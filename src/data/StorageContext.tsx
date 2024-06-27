import { createContext, useState, useEffect } from "react";

interface IStorageContext {
  isAuthenticated: boolean;
  restaurants: any[];
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface IStorageProviderProps {
  children: React.ReactNode;
}

const initialState = {
  isAuthenticated: false,
  restaurants: [],
  login: (email: string, password: string) => {},
  logout: () => {},
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
    // TODO: : Implement login
    //* navigate(`/${data[0].name}/tables`, { replace: true });
  };

  const logout = async () => {
    // TODO: : Implement logout
  };

  return <StorageContext.Provider value={{ isAuthenticated, restaurants, login, logout }}>{children}</StorageContext.Provider>;
};

export { StorageProvider, StorageContext };
