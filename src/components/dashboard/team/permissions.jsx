import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Checkbox from '@mui/joy/Checkbox';
import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import { t } from 'i18next';

import { paths } from '@/paths';
import { BreadcrumbsItem } from '@/components/core/breadcrumbs-item';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';

const columns = [
  { name: 'Actions', width: '300px' },
  { name: 'Tenant Read Only' },
  { name: 'Tenant User' },
  { name: 'Tenant Manager' },
  { name: 'ADMIN' },
];

export function Permissions({ groups = [] }) {
  return (
    <Stack spacing={3}>
      <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
        {t('Permissions')}
      </Typography>
      <Breadcrumbs separator={<BreadcrumbsSeparator />}>
        <BreadcrumbsItem href={paths['dashboard']} type="start" />
        <BreadcrumbsItem href={paths['dashboard.team']}>team</BreadcrumbsItem>
        <BreadcrumbsItem type="end">{t('Permissions')}</BreadcrumbsItem>
      </Breadcrumbs>
      <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
        <Table
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            minWidth: '700px',
            '& th:not(:first-of-type)': {
              textAlign: 'center',
            },
            '& td:not(:first-of-type)': {
              textAlign: 'center',
            },
          }}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.name} style={{ width: column.width, minWidth: column.width, maxWidth: column.width }}>
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <React.Fragment key={group.name}>
                <tr>
                  <td colSpan={5}>
                    <Typography level="title-sm">{group.name}</Typography>
                  </td>
                </tr>
                {group.permissions.map((permission) => (
                  <tr key={permission.name}>
                    <td>{permission.name}</td>
                    {[
                      { id: 'readOnly', value: permission.readOnly },
                      { id: 'member', value: permission.member },
                      { id: 'manager', value: permission.manager },
                      { id: 'admin', value: permission.admin },
                    ].map((role) => (
                      <td key={role.id}>
                        <Checkbox
                          color="neutral"
                          defaultChecked={role.value}
                          readOnly
                          variant="outlined"
                          className="checkboxs"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Card>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button color="neutral" variant="outlined">
          Discard
        </Button>
        <Button>Save Changes</Button>
      </Stack>
    </Stack>
  );
}
