'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import { Kanban as KanbanIcon } from '@phosphor-icons/react/dist/ssr/Kanban';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Table as TableIcon } from '@phosphor-icons/react/dist/ssr/Table';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

import { BoardView } from './board-view';
import { ColumnModal } from './column-modal';
import { ListView } from './list-view';
import { TaskModal } from './task-modal';
import { TasksContext } from './tasks-context';

export function View({ mode }) {
  const {
    columns,
    tasks,
    currentColumnId,
    currentTaskId,
    setCurrentColumnId,
    setCurrentTaskId,
    onColumnUpdate,
    onTaskUpdate,
    onTaskDelete,
    onCommentAdd,
  } = React.useContext(TasksContext);

  const currentColumn = currentColumnId ? columns.get(currentColumnId) : undefined;
  const currentTask = currentTaskId ? tasks.get(currentTaskId) : undefined;

  return (
    <React.Fragment>
      <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Input
            name="task"
            placeholder="Search"
            startDecorator={<MagnifyingGlassIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
            sx={{ maxWidth: '420px' }}
          />
        </Box>
        <Tabs
          sx={{
            '& .MuiTab-root': {
              gap: 1,
            },
          }}
          value={mode}
          variant="custom"
        >
          <TabList>
            <Tab component={RouterLink} href={`${paths['dashboard.tasks']}?view=board`} value="board">
              <KanbanIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
              Board
            </Tab>
            <Tab component={RouterLink} href={`${paths['dashboard.tasks']}?view=list`} value="list">
              <TableIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
              List
            </Tab>
          </TabList>
        </Tabs>
      </Stack>
      <Box
        sx={{
          // Remove container padding
          mx: {
            xs: -2,
            sm: -3,
          },
        }}
      >
        {mode === 'board' ? <BoardView /> : <ListView />}
      </Box>
      {currentColumn ? (
        <ColumnModal
          column={currentColumn}
          onClose={() => {
            setCurrentColumnId(undefined);
          }}
          onColumnUpdate={onColumnUpdate}
          open
        />
      ) : null}
      {currentTask ? (
        <TaskModal
          onClose={() => {
            setCurrentTaskId(undefined);
          }}
          onCommentAdd={onCommentAdd}
          onTaskDelete={(taskId) => {
            setCurrentColumnId(undefined);
            onTaskDelete(taskId);
          }}
          onTaskUpdate={onTaskUpdate}
          open
          task={currentTask}
        />
      ) : null}
    </React.Fragment>
  );
}
