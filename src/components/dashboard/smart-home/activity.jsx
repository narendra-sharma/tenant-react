import * as React from 'react';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { Timeline, TimelineContent, TimelineItem } from '@/components/core/timeline';

export function Activity({ data = [] }) {
  return (
    <Card>
      <Typography level="h4">Recent Activity</Typography>
      <Timeline>
        {data.map((event) => (
          <TimelineItem key={event.id}>
            <TimelineContent>
              <Stack spacing={1}>
                <Typography level="body-xs">{event.timestamp}</Typography>
                <Typography>{event.description}</Typography>
              </Stack>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Card>
  );
}
