import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { StorageContext } from "data/StorageContext";
import { checkAuth } from "utils/auth";

export enum ProtectType {
  MUST_BE_LOGGED_IN,
  MUST_BE_LOGGED_OUT,
}

interface IProtectPageProps {
  protectType: ProtectType;
  Page: () => JSX.Element;
}

const AuthProtectPage = ({ Page, protectType }: IProtectPageProps) => {
  const isAuthenticated = checkAuth();

  if (protectType === ProtectType.MUST_BE_LOGGED_IN && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (protectType === ProtectType.MUST_BE_LOGGED_OUT && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Page />;
};

export default AuthProtectPage;
