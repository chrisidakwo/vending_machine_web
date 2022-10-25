import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const withAuth = (Component: any) => {
  const AuthRoute = (): JSX.Element => {
    const { user, accessToken } = useContext(AuthContext);

    if (null == user || null == accessToken) {
      window.location.href = '/login';
      return <></>;
    } else {
      return <Component />;
    }
  };

  return AuthRoute;
}