import React, {FC, PropsWithChildren} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 1rem;
    width: 100%;
`;

export const FormField: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
      <Wrapper>
          {children}
      </Wrapper>
    );
};
