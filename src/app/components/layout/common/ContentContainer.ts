import styled, { css } from 'styled-components';
import { BREAKPOINT_SCREEN_XS_MAX } from '../../../theme';
import colors from '../../../theme/definitions/colors';

export interface ContentContainerProps {
  backgroundColor?: string;
  paddingBottom?: boolean;
  borderBottom?: boolean;
  layout: 'default' | 'auth';
}

export const ContentContainer = styled.div<ContentContainerProps>`
  background-color: ${colors.grey.light.dark};
  flex-grow: 1;
  width: 650px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: ${BREAKPOINT_SCREEN_XS_MAX}px) {
    width: 100%;
  }
`;