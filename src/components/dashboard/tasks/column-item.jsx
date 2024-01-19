'use client';

import * as React from 'react';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { ArchiveBox as ArchiveBoxIcon } from '@phosphor-icons/react/dist/ssr/ArchiveBox';
import { DotsThreeVertical as DotsThreeVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { usePopover } from '@/hooks/use-popover';

import { ColumnDroppable } from './column-droppable';
import { TaskCard } from './task-card';
import { TaskDraggable } from './task-draggable';

export function ColumnItem({
  column,
  onColumnEdit: onColumnOpen,
  onColumnClear,
  onColumnDelete,
  onTaskOpen,
  onTaskCreate,
  tasks = [],
}) {
  const { id, name } = column;
  const morePopover = usePopover();

  return (
    <React.Fragment>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography level="title-md">{name}</Typography>
            <Chip size="sm" variant="soft">
              {tasks.length}
            </Chip>
          </Stack>
          <IconButton color="neutral" onClick={morePopover.handleOpen} ref={morePopover.anchorRef} size="sm">
            <DotsThreeVerticalIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
          </IconButton>
        </Stack>
        <Button
          color="neutral"
          onClick={() => onTaskCreate?.(id)}
          size="sm"
          startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
          variant="outlined"
        >
          Add Task
        </Button>
        <ColumnDroppable id={id}>
          <Stack spacing={3}>
            {tasks.map((task) => (
              <TaskDraggable id={task.id} key={task.id}>
                <TaskCard onOpen={onTaskOpen} task={task} />
              </TaskDraggable>
            ))}
          </Stack>
        </ColumnDroppable>
      </Stack>
      <Menu
        anchorEl={morePopover.anchorRef.current}
        onClose={morePopover.handleClose}
        open={morePopover.open}
        popperOptions={{ placement: 'bottom-end' }}
        sx={{
          '--ListItem-fontSize': 'var(--joy-fontSize-sm)',
          '--ListItemDecorator-color': 'var(--joy-palette-text-primary)',
          '--ListItemDecorator-size': '2rem',
        }}
      >
        <MenuItem
          onClick={() => {
            morePopover.handleClose();
            onColumnOpen?.(id);
          }}
        >
          <ListItemDecorator>
            <PenIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
          </ListItemDecorator>
          <ListItemContent>Edit</ListItemContent>
        </MenuItem>
        <MenuItem
          onClick={() => {
            morePopover.handleClose();
            onColumnClear?.(id);
          }}
        >
          <ListItemDecorator>
            <ArchiveBoxIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
          </ListItemDecorator>
          <ListItemContent>Clear</ListItemContent>
        </MenuItem>
        <MenuItem
          onClick={() => {
            morePopover.handleClose();
            onColumnDelete?.(id);
          }}
        >
          <ListItemDecorator>
            <TrashIcon color="var(--joy-palette-danger-plainColor)" fontSize="var(--Icon-fontSize)" />
          </ListItemDecorator>
          <ListItemContent sx={{ color: 'var(--joy-palette-danger-plainColor)' }}>Delete</ListItemContent>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
