import React, { useContext, useEffect } from 'react';
import  { useHistory } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

export const useGuestPage = (): void => {
  const { user, accessToken } = useContext(AuthContext);
  const { push } = useHistory();

  useEffect(() => {
    if (null !== user || null !== accessToken) {
      window.location.href = '/';
    }
  }, [user, accessToken]);
};
