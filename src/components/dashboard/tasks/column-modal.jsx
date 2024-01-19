import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';

export function ColumnModal({ column, onClose, onColumnUpdate, open }) {
  const { id, name: initialName } = column;
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSave = React.useCallback(() => {
    if (!name) {
      return;
    }

    if (name === initialName) {
      return;
    }

    onColumnUpdate?.(id, { name });
    onClose?.();
  }, [name, initialName, id, onClose, onColumnUpdate]);

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
          '--ModalDialog-maxWidth': '400px',
          left: 'unset',
          position: 'relative',
          pt: 8,
          top: 'unset',
          transform: 'unset',
          width: '100%',
        }}
        variant="plain"
      >
        <ModalClose />
        <Stack spacing={3}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="columnName"
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={name}
            />
          </FormControl>
          <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
            <Button color="neutral" onClick={handleSave} variant="outlined">
              Save
            </Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
