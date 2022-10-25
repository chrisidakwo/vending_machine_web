import styled from "styled-components";
import {BREAKPOINT_SCREEN_XS_MAX} from "../../../theme/definitions/breakpoints";

export const IconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  right: 2rem;
  top: 2rem;
  z-index: 2;

  @media only screen and (max-width: ${BREAKPOINT_SCREEN_XS_MAX}px) {
    right: 1rem;
    top: 1rem;
  }
`;
