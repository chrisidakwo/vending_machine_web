import { Box, Card } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';
import { ContentContainer } from './common/ContentContainer';
import { PageContainer } from './common/PageContainer';

export interface AuthLayoutProps {
  title: string;
}

export const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = ({ title, children }): JSX.Element => {
  return (
    <React.Fragment>
      <PageContainer>
        <ContentContainer layout={'auth'}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Card variant={'outlined'} sx={{ width: '350px', padding: '20px' }}>
              <h2 style={{ marginTop: '0px', marginBottom: '25px' }}>{title}</h2>

              {children}
            </Card>
          </Box>
        </ContentContainer>
      </PageContainer>
    </React.Fragment>
  );
};
