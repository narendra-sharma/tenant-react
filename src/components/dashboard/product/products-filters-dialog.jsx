'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export function ProductsFiltersDialog({ onClose, open }) {
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
          '--ModalDialog-maxWidth': '550px',
          left: 'unset',
          position: 'relative',
          pt: 8,
          top: 'unset',
          transform: 'unset',
          width: '100%',
        }}
        variant="plain"
      >
        <Box sx={{ pb: 3, pr: '40px' }}>
          <Typography level="h4">Filters</Typography>
          <ModalClose />
        </Box>
        <Stack spacing={3}>
          <Input
            fullWidth
            name="product"
            placeholder="Product"
            startDecorator={<MagnifyingGlassIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
          />
          <FormControl>
            <FormLabel>Stock</FormLabel>
            <RadioGroup defaultValue="all" name="stock">
              <Radio label="All" value="all" />
              <Radio label="In Stock" value="inStock" />
              <Radio label="Low Stock" value="lowStock" />
              <Radio label="Out of Stock" value="outOfStock" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup defaultValue="all" name="status">
              <Radio label="All" value="all" />
              <Radio label="Draft" value="draft" />
              <Radio label="Published" value="published" />
            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            pt: 3,
            '& > *': {
              flexGrow: 1,
            },
          }}
        >
          <Button color="neutral" onClick={onClose} variant="outlined">
            Reset
          </Button>
          <Button onClick={onClose}>Apply</Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
