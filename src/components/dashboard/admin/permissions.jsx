import * as React from 'react';
import { update_permissions } from '@/reduxData/user/userAction';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Checkbox from '@mui/joy/Checkbox';
import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

export function Permissions({ groups = [] }) {
  const { t } = useTranslation();
  const columns = [
    { name: t('Action'), width: '300px' },
    { name: t('Tenant Read Only') },
    { name: t('Tenant User') },
    { name: t('Tenant Manager') },
    { name: t('ADMIN') },
  ];
  const dispatch = useDispatch();
  const [permissions, setPermissions] = React.useState([]);
  React.useEffect(() => {
    setPermissions([...groups]);
  }, [groups]);
  const saveCahnges = () => {
    permissions[0].name = 'tenant_management';
    permissions[1].name = 'admin_manangement';
    update_permissions(permissions, dispatch);
  };
  const changeCheck = (gindex, pindex, role) => {
    let allPermissions = [...permissions];
    allPermissions[gindex].permissions[pindex][role.id] = !role.value;
    setPermissions([...permissions]);
  };
  return (
    <Stack spacing={3}>
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
            {groups.map((group, gindex) => (
              <React.Fragment key={group.name}>
                <tr>
                  <td colSpan={5}>
                    <Typography level="title-sm">{group.name}</Typography>
                  </td>
                </tr>
                {group.permissions.map((permission, pindex) => (
                  <tr key={permission.name}>
                    <td>{permission.name}</td>
                    {[
                      { id: 'tenant_read_only', value: permission.tenant_read_only },
                      { id: 'tenant_user', value: permission.tenant_user },
                      { id: 'tenant_manager', value: permission.tenant_manager },
                      { id: 'admin', value: permission.admin },
                    ].map((role) => (
                      <td key={role.id + pindex}>
                        <Checkbox
                          color="neutral"
                          defaultChecked={role.value}
                          variant="outlined"
                          disabled={role.id === 'admin'}
                          className="checkboxs"
                          onChange={() => changeCheck(gindex, pindex, role)}
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
          {t('Discard')}
        </Button>
        <Button onClick={() => saveCahnges()}>{t('SaveChanges')}</Button>
      </Stack>
    </Stack>
  );
}
