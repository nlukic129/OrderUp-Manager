import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { StorageContext } from "../data/StorageContext";

interface IProtectPageProps {
  Page: () => JSX.Element;
}

const ProtectPage = ({ Page }: IProtectPageProps) => {
  const { isAuthenticated } = useContext(StorageContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Page />;
};

export default ProtectPage;
