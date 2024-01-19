'use client';

import * as React from 'react';
import {
  closestCorners,
  defaultDropAnimation,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Button from '@mui/joy/Button';

import { logger } from '@/lib/default-logger';
import { useMediaQuery } from '@/hooks/use-media-query';

import { ColumnItem } from './column-item';
import { ColumnList } from './column-list';
import { TaskCard } from './task-card';
import { TasksContext } from './tasks-context';

const dropAnimation = {
  ...defaultDropAnimation,
};

export function BoardView() {
  const {
    columns,
    tasks,
    setCurrentColumnId,
    setCurrentTaskId,
    onColumnClear,
    onColumnCreate,
    onColumnDelete,
    onTaskDrag,
    onTaskCreate,
  } = React.useContext(TasksContext);
  const sensors = useMediaSensors();
  const [activeTaskId, setActiveTaskId] = React.useState();

  const activeTask = React.useMemo(() => {
    return activeTaskId ? tasks.get(activeTaskId) : undefined;
  }, [tasks, activeTaskId]);

  const handleDragStart = React.useCallback((event) => {
    if (!canDrag(event)) {
      return;
    }

    const { active } = event;

    setActiveTaskId(active.id);
  }, []);

  const handleDragOver = React.useCallback((_) => {
    // console.log('handleDragOver', active, over);
  }, []);

  const handleDragEnd = React.useCallback(
    (event) => {
      if (!canDrop(event)) {
        return;
      }

      const { active, over } = event;

      onTaskDrag(
        {
          id: active.id,
          type: active.data.current.type,
        },
        {
          id: over.id,
          type: over.data.current.type,
        }
      );
    },
    [onTaskDrag]
  );

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <ColumnList>
        {Array.from(columns.values()).map(({ taskIds, ...column }) => {
          const tasksFiltered = taskIds
            .map((taskId) => tasks.get(taskId))
            .filter((task) => typeof task !== 'undefined');

          return (
            <ColumnItem
              column={column}
              key={column.id}
              onColumnClear={onColumnClear}
              onColumnDelete={onColumnDelete}
              onColumnEdit={setCurrentColumnId}
              onTaskCreate={onTaskCreate}
              onTaskOpen={setCurrentTaskId}
              tasks={tasksFiltered}
            />
          );
        })}
        <div>
          <Button color="neutral" onClick={onColumnCreate} size="sm" variant="soft">
            Add Column
          </Button>
        </div>
      </ColumnList>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeTask ? (
          <div style={{ cursor: 'grab' }}>
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

// Maybe implement a `useDeviceSensors` where
// we use the userAgent instead of media screen size.
function useMediaSensors() {
  const smUp = useMediaQuery('up', 'sm');
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 10,
    },
  });
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });
  return useSensors(smUp ? pointerSensor : touchSensor, keyboardSensor);
}

function canDrag({ active }) {
  if (active.data.current?.type !== 'task') {
    logger.warn('[DnD] onDragStart missing or invalid active type. Must be "task"');
    return false;
  }

  return true;
}

function canDrop({ active, over }) {
  if (!over) {
    // Since all draggable tasks are inside droppable columns,
    // in theory there should always be an "over".
    return false;
  }

  if (!active.data.current || !['task'].includes(active.data.current.type)) {
    // You might want to be able to drag columns.
    // We do did not implement this functionality.
    logger.warn('onDragEnd missing or invalid active type. Must be "task"');
    return false;
  }

  if (!over.data.current || !['column', 'task'].includes(over.data.current.type)) {
    logger.warn('onDragEnd missing or invalid over type, Must be "column" or "task"');
    return false;
  }

  return true;
}
