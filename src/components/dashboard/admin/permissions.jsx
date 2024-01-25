import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Checkbox from '@mui/joy/Checkbox';
import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import { update_permissions } from '@/reduxData/user/userAction';
import { useDispatch } from 'react-redux';

const columns = [
  { name: 'Action', width: '300px' },
  { name: 'Tenant Read Only' },
  { name: 'Tenant User' },
  { name: 'Tenant Manager' },
  { name: 'ADMIN' },
];

export function Permissions({ groups = [] }) {
  const dispatch=useDispatch();
  const [permissions,setPermissions]=React.useState(groups);
  const saveCahnges=()=>{
    update_permissions(permissions,dispatch);
  }
  const changeCheck=(gindex,pindex,role)=>{
    let allPermissions=[...permissions];
    allPermissions[gindex].permissions[pindex][role.id]=!role.value;
    setPermissions([...permissions])
  }
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
            {groups.map((group,gindex) => (
              <React.Fragment key={group.name}>
                <tr>
                  <td colSpan={5}>
                    <Typography level="title-sm">{group.name}</Typography>
                  </td>
                </tr>
                {group.permissions.map((permission,pindex) => (
                  <tr key={permission.name}>
                    <td>{permission.name}</td>
                    {[
                      { id: 'readOnly', value: permission.readOnly },
                      { id: 'member', value: permission.member },
                      { id: 'manager', value: permission.manager },
                      { id: 'admin', value: permission.admin },
                    ].map((role) => (
                      <td key={role.id}>
                        <Checkbox color="neutral" defaultChecked={role.value} readOnly variant="outlined" className='checkboxs' onChange={()=>changeCheck(gindex,pindex,role)}/>
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
        <Button onClick={()=>saveCahnges()}>Save Changes</Button>
      </Stack>
    </Stack>
  
  );
}
