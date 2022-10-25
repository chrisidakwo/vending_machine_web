import React, {FC, PropsWithChildren, ReactNode} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ModalUnstyledOwnProps,
    Typography
} from "@mui/material";
import styled, {css} from "styled-components";
import { IconContainer } from "../../components/layout";
import colors from "../../theme/definitions/colors";

export interface ModalProps extends ModalUnstyledOwnProps {
    title?: string | ReactNode;
    indismissable?: boolean;
    primaryButton?: ReactNode;
    secondaryButton?: ReactNode;
    width?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClose: (event: {}, reason: ModalCloseReason) => void;
}

export type ModalCloseReason = 'backdropClick' | 'escapeKeyDown';

const StyledModal = styled(Dialog)<{ width?: string }>`
  color: ${colors.font};
  
  .MuiPaper-root {
    margin: 0;
    padding: 15px;
    
    ${({ width }) => undefined !== width ? css`
      min-width: ${width};
    ` : css`
      min-width: 350px;
    `}
  }
`;

const StyledModalTitle = styled(DialogTitle)`
    color: ${colors.font};
    font-weight: 700 !important;
    padding: 15px 8px !important;
`;

const StyledModalContent = styled(DialogContent)`
    color: ${colors.font};
    padding: 10px 8px 20px 8px !important;
`;

const Modal: FC<PropsWithChildren<ModalProps>> = ({
    title,
    children,
    open,
    onClose,
    primaryButton,
    secondaryButton,
    keepMounted = false,
    indismissable = false,
    disablePortal,
    width,
}): JSX.Element => {
    return (
        <StyledModal
            aria-labelledby="modal-title"
            open={open}
            onClose={indismissable ? undefined : onClose}
            keepMounted={keepMounted}
            disablePortal={disablePortal ?? keepMounted}
            closeAfterTransition
            width={width}
        >
            {!indismissable && (
                <IconContainer onClick={(event: any) => undefined !== onClose && onClose(event, 'escapeKeyDown')}>
                    <Typography variant={'h6'}>x</Typography>
                </IconContainer>
            )}

            {title && <StyledModalTitle>{title}</StyledModalTitle>}

            <StyledModalContent>
                {children}
            </StyledModalContent>
            {(primaryButton || secondaryButton) && (
                <DialogActions>
                    {secondaryButton && secondaryButton}
                    {primaryButton && primaryButton}
                </DialogActions>
            )}
        </StyledModal>
    );
};

export default Modal;
