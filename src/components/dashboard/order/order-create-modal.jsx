'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';

import { OrderCreateForm } from './order-create-form';

export function OrderCreateModal({ onClose, open }) {
  return (
    <Modal
      onClose={onClose}
      open={open}
      sx={{
        // TODO: Remove when ModalDialog is fixed
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ModalDialog
        sx={{
          // TODO: Remove when ModalDialog is fixed
          '--ModalDialog-maxWidth': '800px',
          left: 'unset',
          position: 'relative',
          top: 'unset',
          transform: 'unset',
          width: '100%',
        }}
        variant="plain"
      >
        <Box sx={{ pb: 3, pr: '40px' }}>
          <Typography level="h4">Create an Order</Typography>
          <ModalClose />
        </Box>
        <Box sx={{ overflowY: 'auto' }}>
          <OrderCreateForm
            compact
            onSubmit={(event) => {
              event.preventDefault();
              onClose?.();
            }}
          />
        </Box>
      </ModalDialog>
    </Modal>
  );
}
