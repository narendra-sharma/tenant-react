import React from 'react';
import Card from '@mui/joy/Card';
import { DeviceTable } from '@/components/dashboard/customer/device-table';

const customers = [
  {
    id: 'CUS-009',
    name: 'Olly Schroeder',
    email: 'olly.schroeder@domain.com',
    phoneNumber: '(269) 278-4358',
    country: 'United States',
    state: 'Michigan',
    city: 'Three Rivers',
    zip: '49093',
    orders: 0,
    paid: '$0.00',
  },
  {
    id: 'CUS-004',
    name: 'Pippa Wilkinson',
    email: 'pippa.wilkinson@domain.com',
    phoneNumber: null,
    country: 'United States',
    state: 'Connecticut',
    city: 'Bridgeport',
    zip: '06604',
    orders: 3,
    paid: '$154.00',
  },
  {
    id: 'CUS-003',
    name: 'Ammar Foley',
    email: 'ammar.foley@domain.com',
    phoneNumber: '(787) 992-6937',
    country: 'United States',
    state: 'Michigan',
    city: 'Watton',
    zip: '49970',
    orders: 1,
    paid: '$75.25',
  },
  {
    id: 'CUS-002',
    name: 'Sienna Hewitt',
    email: 'sienna.hewitt@domain.com',
    phoneNumber: '(907) 555-0101',
    country: 'United States',
    state: 'Nebraska',
    city: 'Omaha',
    zip: '68164',
    orders: 8,
    paid: '$432.09',
  },
  {
    id: 'CUS-001',

    name: 'Zaid Schwartz',
    email: 'zaid.schwartz@domain.com',
    phoneNumber: '(801) 301-7140',
    country: 'United States',
    city: 'Louisville',
    state: 'Kentucky',
    zip: '40202',
    orders: 1,
    paid: '$600.00',
  },
];

export default function Devices() {
  return (
    <React.Fragment>
        <Card sx={{ '--Card-padding': 0, overflowX: 'auto' }}>
         <DeviceTable rows={customers} />
        </Card>
    </React.Fragment>
  );
}
