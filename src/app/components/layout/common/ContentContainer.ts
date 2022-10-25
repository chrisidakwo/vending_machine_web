import styled, { css } from 'styled-components';
import { BREAKPOINT_SCREEN_XS_MAX } from '../../../theme';

export interface ContentContainerProps {
  backgroundColor?: string;
  paddingBottom?: boolean;
  borderBottom?: boolean;
  layout: 'default' | 'auth';
}

export const ContentContainer = styled.div<ContentContainerProps>`
  background-color: #fff;
  flex-grow: 1;
  width: 650px;
  height: 100%;

  @media (max-width: ${BREAKPOINT_SCREEN_XS_MAX}px) {
    width: 100%;
  }
`;