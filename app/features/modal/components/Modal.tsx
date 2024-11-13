import * as React from 'react';

import { Paper, PaperProps } from '@material-ui/core';
import {
  Button,
  Modal,
  ModalDialog,
  Typography,
  CssVarsProvider,
  Box,
} from '@mui/joy';
import Draggable from 'react-draggable';

import { ModalProps } from '../models/modal.model';

// eslint-disable-next-line react/display-name
const DraggablePaper = React.forwardRef((props: PaperProps, ref) => {
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".draggable-handle"
      cancel=".not-draggable"
    >
      <Paper
        ref={nodeRef}
        {...props}
        style={{
          backgroundColor: 'transparent', // 배경색을 투명으로 설정
        }}
      />
    </Draggable>
  );
});

export function ResponsiveModal(props: ModalProps) {
  const { title, header, onOpen = false, onSetOpen, children } = props;

  const handleClose = () => {
    if (onSetOpen) {
      onSetOpen(false);
    }
  };

  return (
    <React.Fragment>
      <CssVarsProvider disableTransitionOnChange>
        {/* <Button
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          Open modal
        </Button> */}
        <Modal
          open={onOpen}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DraggablePaper>
            <ModalDialog
              className="draggable-handle"
              // style={{ cursor: 'move' }}
              aria-labelledby="draggable-dialog-title"
              aria-describedby="draggable-dialog-description"
              sx={(theme) => ({
                position: 'relative',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 1,
                transform: 'translate(-50%, 0%)', // 수평 중앙 정렬
                left: '50%', // 부모의 가로 중앙에 위치
                top: '50%', // 부모의 세로 중앙에 위치
                [theme.breakpoints.only('xs')]: {
                  top: 'unset',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderRadius: 0,
                  transform: 'none',
                  maxWidth: 'unset',
                },
              })}
            >
              <Typography id="draggable-dialog-title" level="h2">
                {title}
              </Typography>
              <Typography
                id="draggable-dialog-description"
                textColor="text.tertiary"
              >
                {header}
              </Typography>
              {children}
              <Box
                sx={{
                  mt: 2, // 버튼들 위쪽 여백
                  display: 'flex',
                  justifyContent: 'space-between', // 좌측과 우측으로 배치
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </ModalDialog>
          </DraggablePaper>
        </Modal>
      </CssVarsProvider>
    </React.Fragment>
  );
}
