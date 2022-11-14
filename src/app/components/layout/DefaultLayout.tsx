import React, { FC, PropsWithChildren } from 'react';
import { NavBar } from '../navbar';
import { ContentContainer } from './common/ContentContainer';
import { PageContainer } from './common/PageContainer';

export interface LayoutProps {
  paddingBottom?: boolean;
  borderBottom?: boolean;
}

export const DefaultLayout: FC<PropsWithChildren<LayoutProps>> = ({ children }): JSX.Element => {
  return (
    <React.Fragment>
      <PageContainer>
        <ContentContainer layout={'default'}>
          <NavBar />
          {children}
        </ContentContainer>
      </PageContainer>
    </React.Fragment>
  );
};
