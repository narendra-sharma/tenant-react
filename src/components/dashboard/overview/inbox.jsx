import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import dayjs from 'dayjs';

import { getInitials } from '@/lib/get-initials';

export function Inbox({ emails = [] }) {
  return (
    <Card>
      <Typography level="h4">Inbox</Typography>
      <CardOverflow sx={{ mb: 'var(--CardOverflow-offset)', mx: 'var(--CardOverflow-offset)' }}>
        <List sx={{ '--List-padding': 0, '--ListItemDecorator-size': '56px', minWidth: '1px' }}>
          {emails.map((email, index) => (
            <React.Fragment key={email.id}>
              <ListItem>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Avatar color="primary" src={email.senderAvatar}>
                    {getInitials(email.senderName)}
                  </Avatar>
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>{email.senderName}</Typography>
                  <Typography level="body-sm" noWrap>
                    {email.subject}
                  </Typography>
                </ListItemContent>
                <Typography level="body-xs" whiteSpace="nowrap">
                  {dayjs().diff(email.receivedAt, 'minute')} min ago
                </Typography>
              </ListItem>
              {index < emails.length - 1 ? <ListDivider /> : null}
            </React.Fragment>
          ))}
        </List>
      </CardOverflow>
    </Card>
  );
}
