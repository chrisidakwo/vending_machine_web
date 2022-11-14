import { AppBar, Box, Container } from '@mui/material';
import React, { useContext, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import styled, { css } from 'styled-components';
import { Auth, AuthContext } from '../../auth';
import { Modal } from '../../ui-kit/modal';
import { ModalCloseReason } from '../../ui-kit/modal/Modal';
import { User, UserRole } from '../../utils/models';
import { DepositForm } from '../deposit-form';

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

const UserInfo = styled(Link)<{ userRole: UserRole | undefined }>`
  color: #fff;
  padding-right: 10px;

  ${({ userRole }) => userRole === 'buyer' && css`
    &:after {
      padding-left: 10px;
      content: '|';
    }
  `}

  &:hover {
    text-decoration: underline;
  }
`;

const DepositSection = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const NavBar = (): JSX.Element => {
  const { onLogout } = useContext(AuthContext);
  const [auth, ] = useLocalStorage<Auth>('auth');

  const [despositAmount, setDepositAmount] = useState(auth?.user?.deposit ?? 0);
  const [openDepositModal, setOpenDepositModal] = useState(false);

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    onLogout && onLogout();
  };
  
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleCloseDepositModal = (event: {}, reason: ModalCloseReason): void => {
    if (reason === 'backdropClick') {
      return;
    }

    setOpenDepositModal(false);
  };
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
      <AppBar position={'sticky'} sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
        <NavContainer maxWidth={'xl'}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', flexDirection: 'row' }}>
            <AppNameSection>
              <StyledLink to={'/'}>VendingMachine</StyledLink>
            </AppNameSection>

            <AuthSection>
              <UserInfo to={'/'} onClick={handleLogout} userRole={auth?.user?.role}>Logout</UserInfo>
              {auth?.user?.role === 'buyer' && (
                <DepositSection onClick={() => setOpenDepositModal(true)}>
                  Current Balance : ¢{despositAmount}
                </DepositSection>
              )}
            </AuthSection>
          </Box>
        </NavContainer>
      </AppBar>

      <Modal title={'Deposit'} open={openDepositModal} onClose={handleCloseDepositModal}>
        <DepositForm onDeposit={(user: User) => {
          setDepositAmount(user.deposit);
          setOpenDepositModal(false);
        }}/>
      </Modal>
    </Box>
  );
}
