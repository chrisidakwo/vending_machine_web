import { AppBar, Box, Container } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../auth';

const NavContainer = styled(Container)`
  display: flex !important;
  align-items: center;
  min-height: 60px;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
`;

const AppNameSection = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-items: start;
  padding-right: 10px;
  width: 100%;
`;

const AuthSection = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.875rem;
  height: 100%;
  justify-content: flex-end;
  padding-left: 10px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: #fff;
  cursor: pointer;
  text-decoration: none;
`;

const UserInfo = styled(Link)`
  color: #fff;
  padding-right: 10px;

  &:after {
    padding-left: 10px;
    content: '|';
  }

  &:hover {
    text-decoration: underline;
  }
`;

const DepositSection = styled.span``; 

export const NavBar = (): JSX.Element => {
  const { user, onLogout } = useContext(AuthContext);

  const handleLogout = (e): void => {
    e.preventDefault();
    onLogout && onLogout();
  }
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
      <AppBar position={'sticky'} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <NavContainer maxWidth={'xl'}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', flexDirection: 'row' }}>
            <AppNameSection>
              <StyledLink to={'/'}>VendingMachine</StyledLink>
            </AppNameSection>

            <AuthSection>
              <UserInfo to={'/'} onClick={handleLogout}>Logout</UserInfo>
              <DepositSection>
                Current Balance : ¢{user?.deposit}
              </DepositSection>
            </AuthSection>
          </Box>
        </NavContainer>
      </AppBar>
    </Box>
  );
}
