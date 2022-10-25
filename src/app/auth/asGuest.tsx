import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const asGuest = (Component: any) => {
  const GuestRoute = (): JSX.Element => {
    const { user } = useContext(AuthContext);

    if (null == user) {
      return <Component />;
    } else {
      window.location.href = '/';
      return <></>;
    }
  };

  return GuestRoute;
}