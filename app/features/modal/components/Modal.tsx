import * as React from 'react';

import { Paper, PaperProps } from '@material-ui/core';
import { Box, Button, Modal, ModalDialog, Typography } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import Draggable from 'react-draggable';

import DetailForm from '~/features/detail-form/components/DetailForm';

// eslint-disable-next-line react/display-name
const DraggablePaper = React.forwardRef((props: PaperProps, ref) => {
  const nodeRef = React.useRef(null);
  return (
    <Draggable nodeRef={nodeRef} handle=".draggable-handle">
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

export function ResponsiveModal() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <CssVarsProvider disableTransitionOnChange>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          Open modal
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
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
                Are you absolutely sure?
              </Typography>
              <Typography
                id="draggable-dialog-description"
                textColor="text.tertiary"
              >
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </Typography>
              <DetailForm />
              <Box
                sx={{
                  mt: 1,
                  display: 'flex',
                  gap: 1,
                  flexDirection: { xs: 'column', sm: 'row-reverse' },
                }}
              >
                <Button
                  variant="solid"
                  color="primary"
                  onClick={() => setOpen(false)}
                >
                  Continue
                </Button>
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => setOpen(false)}
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
