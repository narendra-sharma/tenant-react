import * as React from 'react';
import Card from '@mui/joy/Card';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export function TrafficSource({ data = [] }) {
  return (
    <Card>
      <Typography level="h4">Traffic Source</Typography>
      <List sx={{ '--List-padding': 0, '--ListItem-paddingX': 0, '--ListItemDecorator-size': '48px' }}>
        {data.map((source) => (
          <ListItem key={source.id}>
            <ListItemContent>
              <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                <Typography level="body-sm" sx={{ flexGrow: 1 }} textColor="text.primary">
                  {source.name}
                </Typography>
                <Typography level="body-xs">{source.value}%</Typography>
              </Stack>
              <LinearProgress
                determinate
                sx={{ bgcolor: 'var(--joy-palette-background-level1)' }}
                value={source.value}
                variant="plain"
              />
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
